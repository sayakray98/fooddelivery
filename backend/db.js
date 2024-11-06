const mongoose = require('mongoose');

const connectToMongoose = async () => {
    try {
        const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
        const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
        
        if (!MONGODB_USERNAME || !MONGODB_PASSWORD) {
            throw new Error('MongoDB credentials are not properly configured in environment variables');
        }

        const connectionString = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.o4lln.mongodb.net/mydatabase?retryWrites=true&w=majority`;

        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            maxPoolSize: 10, // Recommended for Vercel serverless
            serverSelectionTimeoutMS: 5000, // Keep the timeout reasonable
            socketTimeoutMS: 45000, // Recommended for serverless
        });

        console.log("Successfully connected to MongoDB");

        // Handle connection events
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });

    } catch (error) {
        console.error("Failed to connect to MongoDB:", error.message);
        throw error; // Let the main application handle the error
    }
};

module.exports = connectToMongoose;
