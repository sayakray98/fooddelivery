const connectToMongoose = require('./db');
const express = require('express');
const cors = require('cors'); // Import cors
const app = express();
const port = 4000;

// Connect to the database
connectToMongoose();

// Middleware to parse JSON
app.use(express.json());

// Enable CORS for all origins
app.use(cors()); // Use cors middleware

// Routes
app.use('/auth', require('./routes/auth'));

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});


