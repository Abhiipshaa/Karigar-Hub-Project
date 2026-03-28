const Product = require("../models/Product");

const getProducts = async (req, res) => {
    try {
        const { category, search } = req.query;
        const filter = {};
        if (category) filter.category = category;
        if (search) filter.name = { $regex: search, $options: "i" };
        const products = await Product.find(filter).populate("artist", "name businessName");
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("artist", "name businessName rating");
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createProduct = async (req, res) => {
    try {
        const { name, description, category, price, stock, images } = req.body;
        if (!name || !description || !price || !stock)
            return res.status(400).json({ message: "Please fill all required fields" });

        const product = await Product.create({ name, description, category, price, stock, images, artist: req.user.id });
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        if (product.artist.toString() !== req.user.id)
            return res.status(403).json({ message: "Not authorized" });

        Object.assign(product, req.body);
        await product.save();
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        if (product.artist.toString() !== req.user.id)
            return res.status(403).json({ message: "Not authorized" });

        await product.deleteOne();
        res.json({ message: "Product deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
