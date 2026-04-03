const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },

    // Address (single - legacy)
    address: {
        addressLine: { type: String, default: '' },
        city:        { type: String, default: '' },
        state:       { type: String, default: '' },
        pincode:     { type: String, default: '' },
        lat:         { type: Number, default: null },
        lng:         { type: Number, default: null },
    },

    // Multiple addresses
    addresses: [{
        label:       { type: String, default: 'Home' },
        addressLine: { type: String, default: '' },
        city:        { type: String, default: '' },
        state:       { type: String, default: '' },
        pincode:     { type: String, default: '' },
    }],

    profileImage: String,

    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],

    isVerified: {
        type: Boolean,
        default: false
    },

    role: {
        type: String,
        default: 'user'
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);