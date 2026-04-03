const Cart    = require("../models/Cart");
const Product = require("../models/Product");

// POST /api/cart  — add / update item
const addToCart = async (req, res) => {
    try {
        const { productId, quantity = 1, customizations = {} } = req.body;
        if (!productId) return res.status(400).json({ message: "productId is required" });

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        // ── Customization validation ──────────────────────────────────────────
        if (product.isCustomizable && product.customizationOptions?.length) {
            for (const opt of product.customizationOptions) {
                const val = customizations[opt.name];

                if (opt.required && (val === undefined || val === null || String(val).trim() === "")) {
                    return res.status(400).json({ message: `'${opt.name}' is required` });
                }

                if (val !== undefined && opt.options?.length && !opt.options.includes(val)) {
                    return res.status(400).json({
                        message: `Invalid value '${val}' for '${opt.name}'. Allowed: ${opt.options.join(", ")}`,
                    });
                }
            }
        }

        // ── Upsert cart ───────────────────────────────────────────────────────
        let cart = await Cart.findOne({ user: req.user.id });
        if (!cart) cart = new Cart({ user: req.user.id, items: [] });

        // Items with customizations are always separate entries
        const hasCustom = Object.keys(customizations).length > 0;
        const customKey = JSON.stringify(customizations);

        const existingIdx = cart.items.findIndex(i => {
            const sameProduct = i.product.toString() === productId;
            if (!sameProduct) return false;
            if (hasCustom) return JSON.stringify(Object.fromEntries(i.customizations)) === customKey;
            return !i.customizations || i.customizations.size === 0;
        });

        if (existingIdx >= 0) {
            cart.items[existingIdx].quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity, customizations });
        }

        await cart.save();
        await cart.populate("items.product", "name price images");
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET /api/cart
const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate("items.product", "name price images category");
        res.json(cart || { items: [] });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE /api/cart/:itemId
const removeFromCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });
        if (!cart) return res.status(404).json({ message: "Cart not found" });
        cart.items = cart.items.filter(i => i._id.toString() !== req.params.itemId);
        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// PATCH /api/cart/:itemId  — update quantity
const updateCartItem = async (req, res) => {
    try {
        const { quantity } = req.body;
        if (!quantity || quantity < 1) return res.status(400).json({ message: "Invalid quantity" });
        const cart = await Cart.findOne({ user: req.user.id });
        if (!cart) return res.status(404).json({ message: "Cart not found" });
        const item = cart.items.id(req.params.itemId);
        if (!item) return res.status(404).json({ message: "Item not found" });
        item.quantity = quantity;
        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { addToCart, getCart, removeFromCart, updateCartItem };
