const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Customer name is required"],
        trim: true,
    },

    email: {
        type: String,
        required: [true, "Customer email is required"],
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
        trim: true,
    },

    phone: {
        type: String,
        required: [true, "Phone number is required"],
        match: [/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, 'Please use a valid phone number'],
    },

    company: {
        type: String,
        default: "",
    },

    address: {
        type: String,
        default: "",
    },

    status: {
        type: String,
        enum: ["Active", "Inactive", "Lead"],
        default: "Active",
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Customer", customerSchema);