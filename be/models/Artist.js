const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema({
    // Basic Info
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

    // Business Info
    businessName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    bio: String,
    profileImage: String,

    // Address
    address: {
        addressLine: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        pincode: {
            type: String,
            required: true
        }
    },

    // Verification
    gstNumber: String,
    panNumber: String,
    aadhaarNumber: String,

    // Bank Details
    bankDetails: {
        accountHolderName: {
            type: String,
            required: true
        },
        bankName: {
            type: String,
            required: true
        },
        accountNumber: {
            type: String,
            required: true
        },
        ifscCode: {
            type: String,
            required: true
        }
    },

    // Trust
    isVerified: {
        type: Boolean,
        default: false
    },
    documentsUploaded: {
        type: Boolean,
        default: false
    },

    rating: {
        type: Number,
        default: 0
    },
    totalSales: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Artist", artistSchema);