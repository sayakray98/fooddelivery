const mongoose = require('mongoose');

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const connectToMongoose = async () => {
    if (cached.conn) {
        console.log('Using cached connection');
        return cached.conn;
    }

    try {
        const MONGODB_USERNAME = process.env.MONGODB_USERNAME || 'djssrock93';
        const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
        
        if (!MONGODB_PASSWORD) {
            throw new Error('MongoDB password is not configured in environment variables');
        }

        const uri = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.o4lln.mongodb.net/fooddelivery?retryWrites=true&w=majority&appName=Cluster0`;

        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            bufferCommands: false,
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        };

        if (!cached.promise) {
            cached.promise = mongoose.connect(uri, opts).then((mongoose) => {
                console.log('✅ Connected to MongoDB Successfully');
                return mongoose;
            });
        }

        cached.conn = await cached.promise;
        return cached.conn;

    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        cached.promise = null;
        throw error;
    }
};

module.exports = connectToMongoose;
