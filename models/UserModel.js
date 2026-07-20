const mongoose = require("mongoose");

const user = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
        max: 100,
        min: 10
    },
    country: {
        type: String,
        required: true,
    },
    zipcode: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other']
    }

    
});

module.exports = mongoose.model("User", user);