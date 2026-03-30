const express = require("express");
const router = express.Router();
const { adminLogin, seedAdmin, getAllUsers, getAllArtists, verifyArtist, getAllOrders, deleteUser } = require("../controllers/adminController");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

// ── Public routes (no token required) ────────────────────────────────────────
router.post("/login", adminLogin);
router.post("/seed", seedAdmin);

// ── Protected routes (token + admin role required) ────────────────────────────
router.get("/users", protect, adminOnly, getAllUsers);
router.delete("/users/:id", protect, adminOnly, deleteUser);
router.get("/artists", protect, adminOnly, getAllArtists);
router.put("/artists/:id/verify", protect, adminOnly, verifyArtist);
router.get("/orders", protect, adminOnly, getAllOrders);

module.exports = router;
