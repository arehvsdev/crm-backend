const mongoose = require("mongoose");

const connectDB = async() => {
    console.log('Attempting mongo db connection');
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to mongo db');
    }
    catch(error){
        console.log('Error connecting to mongo db', error);
    }
}

module.exports = connectDB;