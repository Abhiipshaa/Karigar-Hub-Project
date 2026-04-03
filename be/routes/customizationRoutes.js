const express = require("express");
const router  = express.Router();
const { getKarigarRequests, updateCustomizationStatus } = require("../controllers/customizationController");
const protect = require("../middleware/authMiddleware");

router.get("/karigar",          protect, getKarigarRequests);
router.patch("/:orderItemId",   protect, updateCustomizationStatus);

module.exports = router;
