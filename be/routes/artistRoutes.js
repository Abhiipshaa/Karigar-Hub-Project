const express = require("express");
const router = express.Router();
const Artist = require("../models/Artist");
const protect = require("../middleware/authMiddleware");
const { uploadImage } = require("../middleware/upload");

// One-time: verify all existing artists
router.put("/verify-all", async (req, res) => {
    try {
        await Artist.updateMany({}, { isVerified: true });
        res.json({ message: "All artists verified" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const artists = await Artist.find().select("-password -bankDetails -aadhaarNumber -panNumber -gstNumber");
        res.json(artists);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Toggle follow / unfollow  — must be before /:id
router.post("/:id/follow", protect, async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id);
        if (!artist) return res.status(404).json({ message: "Artist not found" });

        const userId = req.user.id;
        const alreadyFollowing = artist.followers.some(f => f.toString() === userId);

        if (alreadyFollowing) {
            artist.followers = artist.followers.filter(f => f.toString() !== userId);
        } else {
            artist.followers.push(userId);
        }

        await artist.save();
        res.json({ following: !alreadyFollowing, followersCount: artist.followers.length });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get followers list — must be before /:id
router.get("/:id/followers", protect, async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id)
            .select("followers")
            .populate("followers", "name email");
        if (!artist) return res.status(404).json({ message: "Artist not found" });
        res.json(artist.followers);
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

// Upload artist profile image
router.post("/upload/profile-image", protect, uploadImage("artists").single("profileImage"), async (req, res) => {
    try {
        const updated = await Artist.findByIdAndUpdate(
            req.user.id,
            { profileImage: req.file.path },
            { new: true }
        ).select("-password");
        res.json({ profileImage: updated.profileImage });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
