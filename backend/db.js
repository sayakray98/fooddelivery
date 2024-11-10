

const mongoose = require('mongoose');

// main().catch(err => console.log(err));
const connectToMongoose = async () => {
       async function main() {
        await mongoose.connect('mongodb+srv://djssrock93:Sayak1234@@@cluster0.o4lln.mongodb.net/Cluster0?retryWrites=true&w=majority');
        console.log("Hey Connection is Okey!")

    }
    main().catch(err => console.log(err));
}

module.exports = connectToMongoose
