const User = require("../models/User");
const Artist = require("../models/Artist");
const Order = require("../models/Order");

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getAllArtists = async (req, res) => {
    try {
        const artists = await Artist.find().select("-password");
        res.json(artists);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const verifyArtist = async (req, res) => {
    try {
        const artist = await Artist.findByIdAndUpdate(req.params.id, { isVerified: true }, { new: true }).select("-password");
        if (!artist) return res.status(404).json({ message: "Artist not found" });
        res.json({ message: "Artist verified", artist });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("user", "name email").populate("products.product", "name price");
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getAllUsers, getAllArtists, verifyArtist, getAllOrders, deleteUser };
