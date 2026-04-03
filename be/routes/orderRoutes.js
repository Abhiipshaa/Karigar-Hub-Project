const express = require("express");
const router = express.Router();
const { placeOrder, getMyOrders, getOrderById, getArtistOrders } = require("../controllers/orderController");
const protect = require("../middleware/authMiddleware");

router.post("/",        protect, placeOrder);
router.get("/my",       protect, getMyOrders);
router.get("/artist",   protect, getArtistOrders);
router.get("/:id",      protect, getOrderById);

module.exports = router;
