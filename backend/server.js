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

const otpRoutes = require('./routes/otpRoutes'); // Adjust path

const loginAuth = require('./routes/loginAuth');
const userRoutes = require('./routes/user'); // Adjust path



app.use('/api', otpRoutes); 
// Register the login route with prefix /api/login

app.use('/api', loginAuth);
app.use('/api/user', userRoutes); // Register the user route with prefix /api/user

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});