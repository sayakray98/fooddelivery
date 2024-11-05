const mongoose = require('mongoose');
const MONOGODB_USERNAME = process.env.MONGODB_USERNAME;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;

async function connectToMongoose() {
    try {
        // Use a correct MongoDB connection string format
        await mongoose.connect(`mongodb+srv://${MONOGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.o4lln.mongodb.net/mydatabase?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Exit if cannot connect to database
    }
}

module.exports = connectToMongoose;
