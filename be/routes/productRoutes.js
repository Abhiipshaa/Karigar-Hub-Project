const express = require("express");
const router = express.Router();
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require("../controllers/productController");
const protect = require("../middleware/authMiddleware");
const { uploadImage, uploadVideo } = require("../middleware/upload");

router.get("/", getProducts);

// Upload routes must be before /:id
router.post("/upload/images", protect, uploadImage("products").array("images", 5), (req, res) => {
    const urls = req.files.map((f) => f.path);
    res.json({ urls });
});

router.post("/upload/video", protect, uploadVideo("products").single("video"), (req, res) => {
    res.json({ url: req.file.path });
});

router.get("/bestsellers", async (req, res) => {
    try {
        const Order = require("../models/Order");
        const Product = require("../models/Product");

        const topProducts = await Order.aggregate([
            { $unwind: "$products" },
            { $group: { _id: "$products.product", totalSold: { $sum: "$products.quantity" } } },
            { $sort: { totalSold: -1 } },
            { $limit: 8 },
            { $lookup: { from: "products", localField: "_id", foreignField: "_id", as: "product" } },
            { $unwind: "$product" },
            { $replaceRoot: { newRoot: { $mergeObjects: ["$product", { totalSold: "$totalSold" }] } } }
        ]);

        // Populate artist field manually
        const populated = await Product.populate(topProducts, { path: "artist", select: "name businessName" });
        res.json(populated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

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

module.exports = router;
