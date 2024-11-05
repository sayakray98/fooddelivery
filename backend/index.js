const connectToMongoose = require('./db');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;

// Connect to the database
connectToMongoose();

// Middleware to parse JSON
app.use(express.json());

// Enable CORS for the specified origin
app.use(cors({
  origin: 'https://fooddelivery-zhoa.vercel.app'
}));

// Routes
app.use('/auth', require('./routes/auth'));

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
app.get('/', (req, res) => {
  res.send('Server is running');
});
