// backend/server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();



const app = express();
const PORT = process.env.PORT || 5001;


// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());
//define routes

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});