const express = require("express");
const router = express.Router();
const User = require("../models/User");
const protect = require("../middleware/authMiddleware");
const { uploadImage } = require("../middleware/upload");

router.get("/profile", protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password").populate("wishlist", "name price images");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put("/profile", protect, async (req, res) => {
    try {
        const updated = await User.findByIdAndUpdate(req.user.id, req.body, { new: true }).select("-password");
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/upload/profile-image", protect, uploadImage("users").single("profileImage"), async (req, res) => {
    try {
        const updated = await User.findByIdAndUpdate(
            req.user.id,
            { profileImage: req.file.path },
            { new: true }
        ).select("-password");
        res.json({ profileImage: updated.profileImage });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/wishlist/:productId", protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const pid = req.params.productId;
        const idx = user.wishlist.indexOf(pid);
        if (idx === -1) user.wishlist.push(pid);
        else user.wishlist.splice(idx, 1);
        await user.save();
        res.json({ wishlist: user.wishlist });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
