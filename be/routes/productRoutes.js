const express = require("express");
const router = express.Router();
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require("../controllers/productController");
const protect = require("../middleware/authMiddleware");
const { uploadImage, uploadVideo } = require("../middleware/upload");

router.get("/", getProducts);
router.get("/my", protect, async (req, res) => {
    try {
        const Product = require("../models/Product");
        const products = await Product.find({ artist: req.user.id }).populate("artist", "name businessName");
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.get("/:id", getProductById);
router.post("/", protect, createProduct);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);

// Upload product images (max 5)
router.post("/upload/images", protect, uploadImage("products").array("images", 5), (req, res) => {
    const urls = req.files.map((f) => f.path);
    res.json({ urls });
});

// Upload product video (single)
router.post("/upload/video", protect, uploadVideo("products").single("video"), (req, res) => {
    res.json({ url: req.file.path });
});

module.exports = router;
