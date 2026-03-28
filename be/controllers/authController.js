const User = require("../models/User");
const Artist = require("../models/Artist");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (id, role) =>
    jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });

const registerUser = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;
        if (!name || !email || !password || !phone)
            return res.status(400).json({ message: "Please fill all required fields" });

        if (await User.findOne({ email }))
            return res.status(400).json({ message: "User already exists" });

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashed, phone, address });

        res.status(201).json({ _id: user._id, name: user.name, email: user.email, token: generateToken(user._id, "user") });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            return res.json({ _id: user._id, name: user.name, email: user.email, token: generateToken(user._id, "user") });
        }
        res.status(401).json({ message: "Invalid email or password" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const registerArtist = async (req, res) => {
    try {
        const { name, email, password, phone, businessName, category, bio, address, gstNumber, panNumber, aadhaarNumber, bankDetails } = req.body;
        if (!name || !email || !password || !phone || !businessName || !category || !address || !bankDetails)
            return res.status(400).json({ message: "Please fill all required fields" });

        if (!gstNumber && !panNumber && !aadhaarNumber)
            return res.status(400).json({ message: "Provide at least one identity proof (GST, PAN, or Aadhaar)" });

        if (await Artist.findOne({ email }))
            return res.status(400).json({ message: "Artist already exists" });

        const hashed = await bcrypt.hash(password, 10);
        const artist = await Artist.create({ name, email, password: hashed, phone, businessName, category, bio, address, gstNumber, panNumber, aadhaarNumber, bankDetails });

        res.status(201).json({ _id: artist._id, name: artist.name, email: artist.email, businessName: artist.businessName, token: generateToken(artist._id, "artist") });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const loginArtist = async (req, res) => {
    try {
        const { email, password } = req.body;
        const artist = await Artist.findOne({ email });
        if (artist && (await bcrypt.compare(password, artist.password))) {
            return res.json({ _id: artist._id, name: artist.name, email: artist.email, businessName: artist.businessName, token: generateToken(artist._id, "artist") });
        }
        res.status(401).json({ message: "Invalid email or password" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { registerUser, loginUser, registerArtist, loginArtist };
