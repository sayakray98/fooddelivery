require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectToMongoose = require('./db');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'https://fooddelivery-zhoa.vercel.app',
    credentials: true
}));

// Test route to verify database connection
app.get('/api/test', async (req, res) => {
    try {
        await connectToMongoose();
        const collections = await mongoose.connection.db.listCollections().toArray();
        res.json({ 
            status: 'success', 
            message: 'Connected to MongoDB successfully',
            database: 'fooddelivery',
            collections: collections.map(c => c.name)
        });
    } catch (error) {
        console.error('Test endpoint error:', error);
        res.status(500).json({ 
            status: 'error', 
            message: 'Failed to connect to database',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
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
