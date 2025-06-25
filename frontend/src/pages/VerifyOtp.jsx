// src/pages/VerifyOtp.jsx

import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function VerifyOtp() {
  const [otp, setOtp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('http://localhost:5001/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('🎉 OTP verified! You are now registered.');
        navigate('/login'); // redirect to login
      } else {
        alert(`❌ ${data.message}`);
      }
    } catch (error) {
      console.error('OTP verify error:', error);
      alert('❌ Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Enter OTP</h2>
        <p className="text-sm mb-2 text-gray-600 text-center">
          Sent to: <strong>{email}</strong>
        </p>

        <input
          type="text"
          name="otp"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded mb-4 outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isSubmitting ? 'Verifying...' : 'Verify OTP'}
        </button>
      </form>
    </div>
  );
}