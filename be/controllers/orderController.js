const Order = require("../models/Order");

const placeOrder = async (req, res) => {
    try {
        const { products, totalPrice, paymentMethod, shippingAddress } = req.body;
        if (!products || !totalPrice || !paymentMethod || !shippingAddress)
            return res.status(400).json({ message: "Please fill all required fields" });

        const order = await Order.create({ user: req.user.id, products, totalPrice, paymentMethod, shippingAddress });
        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).populate("products.product", "name price images");
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

module.exports = { placeOrder, getMyOrders, getOrderById };
