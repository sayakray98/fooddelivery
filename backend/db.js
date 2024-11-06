const mongoose = require('mongoose');

const connectToMongoose = async () => {
    try {
        const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
        const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
        const MONGODB_CLUSTER = process.env.MONGODB_CLUSTER || 'cluster0.o4lln.mongodb.net';
        const MONGODB_DATABASE = process.env.MONGODB_DATABASE || 'mydatabase';
        
        // Validate environment variables
        if (!MONGODB_USERNAME || !MONGODB_PASSWORD) {
            throw new Error('MongoDB credentials are not properly configured in environment variables');
        }

        const connectionString = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER}/${MONGODB_DATABASE}?retryWrites=true&w=majority`;

        // Configure connection options
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4 // Force IPv4
        };

        // Attempt connection
        await mongoose.connect(connectionString, options);
        console.log("✅ Successfully connected to MongoDB");

        // Set up connection event handlers
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
            // Attempt to reconnect
            setTimeout(() => {
                mongoose.connect(connectionString, options);
            }, 5000);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected. Attempting to reconnect...');
            setTimeout(() => {
                mongoose.connect(connectionString, options);
            }, 5000);
        });

        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('MongoDB connection closed through app termination');
            process.exit(0);
        });

    } catch (error) {
        console.error("Failed to connect to MongoDB:", error.message);
        // Add more context to the error
        if (error.message.includes('bad auth')) {
            console.error("Authentication failed. Please check your username and password.");
        } else if (error.message.includes('getaddrinfo ENOTFOUND')) {
            console.error("Could not reach the database. Please check your cluster URL.");
        }
        throw error;
    }
};

module.exports = connectToMongoose;
