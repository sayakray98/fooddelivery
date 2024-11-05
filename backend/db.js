const mongoose = require('mongoose');

connectToMongoose().catch(err => console.log(err));

async function connectToMongoose() {
    await mongoose.connect('mongodb+srv://djssrock93:Sayak1234@@@cluster0.o4lln.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

    console.log("Connected to MongoDB");
}

module.exports = connectToMongoose;
