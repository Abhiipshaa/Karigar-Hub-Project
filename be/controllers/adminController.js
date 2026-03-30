const User = require("../models/User");
const Artist = require("../models/Artist");
const Order = require("../models/Order");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, role: 'admin' });
        if (!user) return res.status(401).json({ message: "Invalid admin credentials" });
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ message: "Invalid admin credentials" });
        const token = jwt.sign({ id: user._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ _id: user._id, name: user.name, email: user.email, role: 'admin', token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const seedAdmin = async (req, res) => {
    try {
        const exists = await User.findOne({ email: 'admin@karigarhub.com' });
        if (exists) return res.json({ message: 'Admin already exists' });
        const hashed = await bcrypt.hash('Admin@123', 10);
        await User.create({ name: 'Admin', email: 'admin@karigarhub.com', password: hashed, phone: '0000000000', role: 'admin' });
        res.json({ message: 'Admin created', email: 'admin@karigarhub.com', password: 'Admin@123' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

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

module.exports = { adminLogin, seedAdmin, getAllUsers, getAllArtists, verifyArtist, getAllOrders, deleteUser };
