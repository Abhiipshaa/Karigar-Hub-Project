const express = require("express");
const router = express.Router();
const { getAllUsers, getAllArtists, verifyArtist, getAllOrders, deleteUser } = require("../controllers/adminController");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

router.use(protect, adminOnly);

router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);
router.get("/artists", getAllArtists);
router.put("/artists/:id/verify", verifyArtist);
router.get("/orders", getAllOrders);

module.exports = router;
