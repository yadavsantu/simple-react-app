const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Update path as needed

const otpStore = new Map(); // In-memory temporary store
const OTP_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes
const RESEND_WAIT_MS = 30 * 1000; // 30 seconds

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// === SEND OTP ===
router.post('/send-otp', async (req, res) => {
  const { email, firstName, lastName, phone, password } = req.body;

  if (!email || !firstName || !lastName || !phone || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(409).json({ message: 'User already exists' });

  const now = Date.now();
  const existing = otpStore.get(email);
  if (existing && now - existing.lastSentAt < RESEND_WAIT_MS) {
    const wait = Math.ceil((RESEND_WAIT_MS - (now - existing.lastSentAt)) / 1000);
    return res.status(429).json({ message: `Please wait ${wait}s before resending OTP.` });
  }

  const otp = generateOTP();
  const expiry = now + OTP_EXPIRY_MS;

  otpStore.set(email, {
    otp,
    expiry,
    lastSentAt: now,
    userData: { firstName, lastName, phone, password },
  });

  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Your OTP Code',
      html: `<p>Your OTP is: <b>${otp}</b>. It expires in 5 minutes.</p>`,
    });

    return res.status(200).json({ message: 'OTP sent successfully.' });
  } catch (err) {
    console.error('Email send error:', err);
    return res.status(500).json({ message: 'Failed to send OTP.' });
  }
});

// === VERIFY OTP ===
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  const record = otpStore.get(email);

  if (!record) return res.status(400).json({ message: 'No OTP sent to this email.' });

  const now = Date.now();
  if (now > record.expiry) {
    otpStore.delete(email);
    return res.status(400).json({ message: 'OTP expired. Please request a new one.' });
  }

  if (record.otp !== otp)
    return res.status(400).json({ message: 'Invalid OTP' });

  const { firstName, lastName, phone, password } = record.userData;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      phone,
      password: password,
      userValidated: true,
    });

    await newUser.save();
    otpStore.delete(email); // cleanup

    return res.status(201).json({ message: '✅ User registered successfully after OTP verification!' });
  } catch (err) {
    console.error('DB save error:', err);
    return res.status(500).json({ message: '❌ Failed to save user.' });
  }
});

module.exports = router;