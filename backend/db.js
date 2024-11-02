const mongoose = require('mongoose');

connectToMongoose().catch(err => console.log(err));

async function connectToMongoose() {
    await mongoose.connect('mongodb://localhost:27017/test');

    console.log("Connected to MongoDB");
}

module.exports = connectToMongoose;