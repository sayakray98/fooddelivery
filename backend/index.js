const connectToMongoose = require('./db');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000; // Allow for dynamic port assignment

// Connect to the database
connectToMongoose();

// Middleware
app.use(express.json());

// Configure CORS to accept requests from multiple origins
app.use(cors({
    origin: [
        'https://fooddelivery-zhoa.vercel.app',
        'https://fooddelivery-ae8z-7u5thp7g0-sayak-rays-projects.vercel.app',
        process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : ''
    ].filter(Boolean),
    credentials: true
}));

// Health check route
app.get('/', (req, res) => {
    res.status(200).json({ status: 'Server is running' });
});

// Routes
app.use('/auth', require('./routes/auth'));

// Error handling middleware
app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});
