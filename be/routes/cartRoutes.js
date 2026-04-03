const express = require("express");
const router  = express.Router();
const { addToCart, getCart, removeFromCart, updateCartItem } = require("../controllers/cartController");
const protect = require("../middleware/authMiddleware");

router.get("/",           protect, getCart);
router.post("/",          protect, addToCart);
router.delete("/:itemId", protect, removeFromCart);
router.patch("/:itemId",  protect, updateCartItem);

module.exports = router;
