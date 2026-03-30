const Artist = require("../models/Artist");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });
};

// ✅ Register Artist
const createArtist = async(req, res) => {
    try {
        const {
            name,
            email,
            password,
            phone,
            businessName,
            category,
            bio,
            address,
            gstNumber,
            panNumber,
            aadhaarNumber,
            bankDetails
        } = req.body;

        // 🔍 Validate required fields
        if (!name ||
            !email ||
            !password ||
            !phone ||
            !businessName ||
            !category ||
            !address ||
            !bankDetails
        ) {
            return res.status(400).json({ message: "Please fill all required fields" });
        }

        // ❌ Check if artist already exists
        const artistExists = await Artist.findOne({ email });

        if (artistExists) {
            return res.status(400).json({ message: "Artist already exists" });
        }

        // 🔐 Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // ⚠️ Identity check (at least one required)
        if (!gstNumber && !panNumber && !aadhaarNumber) {
            return res.status(400).json({
                message: "Provide at least one identity proof (GST, PAN, or Aadhaar)"
            });
        }

        // ✅ Create Artist
        const artist = await Artist.create({
            name,
            email,
            password: hashedPassword,
            phone,
            businessName,
            category,
            bio,
            address,
            gstNumber,
            panNumber,
            aadhaarNumber,
            bankDetails
        });

        res.status(201).json({
            _id: artist._id,
            name: artist.name,
            email: artist.email,
            businessName: artist.businessName,
            token: generateToken(artist._id)
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Login Artist
const loginArtist = async(req, res) => {
    try {
        const { email, password } = req.body;

        const artist = await Artist.findOne({ email });

        if (artist && (await bcrypt.compare(password, artist.password))) {
            res.json({
                _id: artist._id,
                name: artist.name,
                email: artist.email,
                businessName: artist.businessName,
                token: generateToken(artist._id)
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Get all artists
const getArtists = async(req, res) => {
    try {
        const artists = await Artist.find().select("-password");
        res.json(artists);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createArtist, loginArtist, getArtists };