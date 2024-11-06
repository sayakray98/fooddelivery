require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectToMongoose = require('./db');

const app = express();

// CORS Configuration
const corsOptions = {
    origin: ['https://fooddelivery-zhoa.vercel.app', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials: true,
    maxAge: 86400 // 24 hours
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Middleware
app.use(express.json());

// Add headers middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});

// Test route
app.get('/test', (req, res) => {
    res.json({ message: 'Server is working' });
});

// Health check route
app.get('/', async (req, res) => {
    try {
        await connectToMongoose();
        res.json({ status: 'healthy', message: 'Server is running and database is connected' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Server is running but database connection failed' });
    }
});

// Routes
app.use('/auth', require('./routes/auth'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        message: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
    });
});


module.exports = app;


