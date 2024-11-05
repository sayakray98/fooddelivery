const mongoose = require('mongoose');
const MONOGODB_USERNAME = 'djssrock93'
const MONGODB_PASSWORD = 'Sayak1234@@'
async function connectToMongoose() {
    try {
        // Fix the MongoDB connection string - remove extra @ symbols
        await mongoose.connect(`mongodb+srv://${MONOGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.o4lln.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Exit if cannot connect to database
    }
}

module.exports = connectToMongoose;
