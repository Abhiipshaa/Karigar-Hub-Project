const express = require("express");
const router = express.Router();
const { registerUser, loginUser, registerArtist, loginArtist } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");
const User = require("../models/User");
const Artist = require("../models/Artist");

// Existing routes
router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.post("/artist/register", registerArtist);
router.post("/artist/login", loginArtist);

// POST /api/auth/register — role field determines user or artist
router.post("/register", async (req, res) => {
    const { role } = req.body;
    if (role === "karigar" || role === "artist") return registerArtist(req, res);
    return registerUser(req, res);
});

// POST /api/auth/login — tries user first, then artist
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ message: "Email and password are required" });

    try {
        const bcrypt = require("bcryptjs");

        // Check artist first
        const artist = await Artist.findOne({ email });
        if (artist) {
            const match = await bcrypt.compare(password, artist.password);
            if (!match) return res.status(401).json({ message: "Invalid email or password" });
            return res.json({ _id: artist._id, name: artist.name, email: artist.email, role: "artist", token: require("jsonwebtoken").sign({ id: artist._id, role: "artist" }, process.env.JWT_SECRET, { expiresIn: "7d" }) });
        }

        // Check user
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: "No account found with this email" });
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ message: "Invalid email or password" });
        return res.json({ _id: user._id, name: user.name, email: user.email, phone: user.phone, role: "user", token: require("jsonwebtoken").sign({ id: user._id, role: "user" }, process.env.JWT_SECRET, { expiresIn: "7d" }) });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /api/auth/me — returns current logged-in user/artist
router.get("/me", protect, async (req, res) => {
    try {
        const { role, id } = req.user;
        if (role === "artist") {
            const artist = await Artist.findById(id).select("-password -bankDetails -aadhaarNumber -panNumber -gstNumber");
            return res.json({ ...artist.toObject(), role: "artist" });
        }
        const user = await User.findById(id).select("-password");
        res.json({ ...user.toObject(), role: "user" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
