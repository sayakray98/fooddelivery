const connectToMongoose = require('./db');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;
const allowedOrigin = process.env.ALLOWED_ORIGIN || 'https://fooddelivery-zhoa.vercel.app';

// Connect to the database with error handling
connectToMongoose().catch(error => {
  console.error('Failed to connect to MongoDB:', error);
  process.exit(1); // Exit if the database connection fails
});

// Middleware to parse JSON
app.use(express.json());

// Enable CORS for the specified origin
app.use(cors({
  origin: allowedOrigin
}));

// Routes
app.use('/auth', require('./routes/auth'));

// Start the server with error handling
app.listen(port, (err) => {
  if (err) {
    console.error('Failed to start server:', err);
    process.exit(1); // Exit if the server fails to start
  }
  console.log(`Example app listening at http://localhost:${port}`);
});
