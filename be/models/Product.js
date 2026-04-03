const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },

    images: [String],

    // Relation to Artist
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artist",
        required: true
    },

    ratings: {
        type: Number,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0
    },

    isCustomizable: {
        type: Boolean,
        default: false
    },
    customizationOptions: [
        {
            name:     { type: String, required: true },
            type:     { type: String, enum: ['dropdown', 'radio', 'text', 'number'], required: true },
            required: { type: Boolean, default: false },
            options:  [String],
            priceAdd: { type: Number, default: 0 },
        }
    ]

}, {
    timestamps: true
});

module.exports = mongoose.model("Product", productSchema);