require('dotenv').config(); // Load environment variables
const connectToMongoose = require('../db'); // Adjust the path based on your structure
const express = require('express');
const cors = require('cors'); // Import cors
const app = express();

// Connect to the database
connectToMongoose();

// Middleware to parse JSON
app.use(express.json());

// Enable CORS for specified origin
app.use(cors({
  origin: 'https://fooddelivery-zhoa.vercel.app'
}));

// Define a simple GET route for the root path
app.get('/', (req, res) => {
  res.send("Hello, World!");
});

// Routes
app.use('/auth', require('./routes/auth')); // Adjust the path if necessary

// Export the app for Vercel to use it as a serverless function
module.exports = app;
