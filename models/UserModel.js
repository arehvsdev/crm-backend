const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
            trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
            unique: true,
            match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
            lowercase: true,
            trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
            minlength: 6,
    },
    role: {
        type: String,
        enum: ["User", "Admin"],
        default: "User",
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema);