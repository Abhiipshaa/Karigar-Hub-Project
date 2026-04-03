const Order   = require("../models/Order");
const Product = require("../models/Product");

// GET /api/customization/karigar
// Returns all order items that belong to this artist and have a customization note
const getKarigarRequests = async (req, res) => {
    try {
        // Find all products owned by this artist
        const myProducts = await Product.find({ artist: req.user.id }).select("_id name images price");
        const myProductIds = myProducts.map(p => p._id.toString());

        // Find orders that contain at least one of this artist's products with a note
        const orders = await Order.find({
            "products.product": { $in: myProductIds },
        })
            .populate("user", "name email phone")
            .populate("products.product", "name images price");

        const requests = [];
        orders.forEach(order => {
            order.products.forEach(item => {
                const pid = item.product?._id?.toString();
                if (myProductIds.includes(pid) && item.customizationNote?.trim()) {
                    requests.push({
                        orderId:            order._id,
                        orderItemId:        item._id,
                        product:            item.product,
                        user:               order.user,
                        quantity:           item.quantity,
                        customizationNote:  item.customizationNote,
                        customizationStatus: item.customizationStatus,
                        createdAt:          order.createdAt,
                    });
                }
            });
        });

        res.json(requests);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// PATCH /api/customization/:orderItemId
// Artist accepts or rejects a customization request
const updateCustomizationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        if (!["accepted", "rejected"].includes(status))
            return res.status(400).json({ message: "Status must be 'accepted' or 'rejected'" });

        // Find the order containing this item
        const order = await Order.findOne({ "products._id": req.params.orderItemId })
            .populate("products.product", "artist");

        if (!order) return res.status(404).json({ message: "Order item not found" });

        const item = order.products.id(req.params.orderItemId);
        if (!item) return res.status(404).json({ message: "Order item not found" });

        // Verify this product belongs to the requesting artist
        if (item.product?.artist?.toString() !== req.user.id)
            return res.status(403).json({ message: "Not authorized" });

        item.customizationStatus = status;
        await order.save();

        res.json({ message: `Customization ${status}`, customizationStatus: status });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getKarigarRequests, updateCustomizationStatus };
