const Order = require("../models/Order");
const Product = require("../models/Product");

const placeOrder = async (req, res) => {
    try {
        const { products, totalPrice, paymentMethod, shippingAddress } = req.body;
        if (!products || !totalPrice || !paymentMethod || !shippingAddress)
            return res.status(400).json({ message: "Please fill all required fields" });

        // Map products and carry customizationNote; set status to pending if note exists
        const mappedProducts = products.map(p => ({
            product:  p.product,
            quantity: p.quantity,
            customizationNote:   p.customizationNote   || "",
            customizationStatus: p.customizationNote?.trim() ? "pending" : "none",
        }));

        const order = await Order.create({ user: req.user.id, products: mappedProducts, totalPrice, paymentMethod, shippingAddress });
        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id })
            .populate("products.product", "name price images")
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("products.product", "name price images");
        if (!order) return res.status(404).json({ message: "Order not found" });
        if (order.user.toString() !== req.user.id)
            return res.status(403).json({ message: "Not authorized" });
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET /api/orders/artist  — all orders that contain this artist's products
const getArtistOrders = async (req, res) => {
    try {
        const myProducts = await Product.find({ artist: req.user.id }).select("_id");
        const myProductIds = myProducts.map(p => p._id);

        const orders = await Order.find({ "products.product": { $in: myProductIds } })
            .populate("user", "name email")
            .populate("products.product", "name price images artist")
            .sort({ createdAt: -1 });

        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { placeOrder, getMyOrders, getOrderById, getArtistOrders };
