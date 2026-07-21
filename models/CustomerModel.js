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
        trim: true,
    },

    phone: {
        type: String,
        required: [true, "Phone number is required"],
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
        enum: ["Active", "Inactive"],
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