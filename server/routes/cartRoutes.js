const express = require("express");
const { validateCart, checkout } = require("../controllers/cartController");

const router = express.Router();

// Validate local cart
router.post("/validate", validateCart);

// Create order from cart
router.post("/checkout", checkout);

module.exports = router;
