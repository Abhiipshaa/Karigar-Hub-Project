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

    // Address
    address: {
        addressLine: String,
        city: String,
        state: String,
        pincode: String,
        country: {
            type: String,
            default: "India"
        }
    },

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