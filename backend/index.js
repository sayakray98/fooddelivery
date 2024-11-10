const express = require('express');
const app = express();
const connectToMongoose = require('./db');
const cors = require('cors');

// Connect to MongoDB
connectToMongoose();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/auth', require('./routes/auth'));

// Export the app (Vercel will use this as a serverless function)
module.exports = app;
