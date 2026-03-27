const express = require("express");
const router = express.Router();
const Artist = require("../models/Artist");
const protect = require("../middleware/authMiddleware");

router.get("/", async (req, res) => {
    try {
        const artists = await Artist.find({ isVerified: true }).select("-password -bankDetails -aadhaarNumber -panNumber -gstNumber");
        res.json(artists);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id).select("-password -bankDetails -aadhaarNumber -panNumber -gstNumber");
        if (!artist) return res.status(404).json({ message: "Artist not found" });
        res.json(artist);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put("/profile", protect, async (req, res) => {
    try {
        const updated = await Artist.findByIdAndUpdate(req.user.id, req.body, { new: true }).select("-password");
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
