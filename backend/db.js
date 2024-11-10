const mongoose = require('mongoose');

const connectToMongoose = async () => {
    try {
        await mongoose.connect('mongodb+srv://djssrock93:uZgKZqnW76Pzl2lR@cluster0.o4lln.mongodb.net/Cluster0?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connection to MongoDB is successful!");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
};

module.exports = connectToMongoose;
