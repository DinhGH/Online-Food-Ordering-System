const {
  addToCart,
  batchAddToCart,
  getCartItems,
  getCartSummary,
  updateCartItemQuantity,
  removeCartItem,
  clearUserCart,
  validateCartItems,
} = require("../services/cartService");

// --- Helpers ---
const validateQuantity = (qty) => {
  const q = Number(qty);
  if (!q || q < 1 || q > 999)
    throw new Error("Quantity must be between 1 and 999");
  return q;
};

const validateProductId = (id) => {
  const pid = Number(id);
  if (!pid || pid < 1) throw new Error("Invalid product ID");
  return pid;
};

const getUserId = (req) => {
  const uid = req.user?.userId;
  if (!uid) throw new Error("Unauthorized: userId missing");
  return uid;
};

// ----------------------------------------
// Add to cart (single or batch)
// ----------------------------------------
exports.addCart = async (req, res) => {
  try {
    const userId = getUserId(req);

    const isBatch = Array.isArray(req.body);

    if (isBatch) {
      const items = req.body.map((item) => ({
        productId: validateProductId(item.productId),
        quantity: validateQuantity(item.quantity || 1),
      }));

      const result = await batchAddToCart(userId, items);

      return res.status(201).json({
        success: true,
        message: "Batch items added successfully",
        ...result,
      });
    }

    const { productId, quantity } = req.body;

    const result = await addToCart(
      userId,
      validateProductId(productId),
      validateQuantity(quantity || 1)
    );

    res.status(201).json({
      success: true,
      message: "Item added successfully",
      ...result,
    });
  } catch (err) {
    console.error("Add to cart error:", err);

    const message = err.message || "Server error";

    const knownErrors = ["not found", "Invalid", "stock", "Quantity"];

    if (knownErrors.some((t) => message.includes(t))) {
      return res.status(message.includes("stock") ? 409 : 400).json({
        success: false,
        message,
      });
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ----------------------------------------
// Get cart
// ----------------------------------------
exports.getCart = async (req, res) => {
  try {
    const userId = getUserId(req);

    const includeInactive = req.query.includeInactive === "true";

    const items = await getCartItems(userId, { includeInactive });
    const summary = await getCartSummary(userId);

    res.json({
      success: true,
      data: { items, summary },
    });
  } catch (err) {
    console.error("Get cart error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve cart",
    });
  }
};

// ----------------------------------------
// Update quantity
// ----------------------------------------
exports.updateQuantity = async (req, res) => {
  try {
    const userId = getUserId(req);

    const cartId = Number(req.params.id);
    const quantity = validateQuantity(req.body.quantity);

    const updatedItem = await updateCartItemQuantity(cartId, quantity, userId);

    res.json({
      success: true,
      data: updatedItem,
    });
  } catch (err) {
    console.error("Update quantity error:", err);

    if (err.message.includes("not found") || err.message.includes("not own")) {
      return res.status(404).json({ success: false, message: err.message });
    }

    return res.status(400).json({ success: false, message: err.message });
  }
};

// ----------------------------------------
// Delete cart item
// ----------------------------------------
exports.deleteItem = async (req, res) => {
  try {
    const userId = getUserId(req);

    const result = await removeCartItem(Number(req.params.id), userId);

    res.json({
      success: true,
      ...result,
    });
  } catch (err) {
    console.error("Delete cart error:", err);

    if (err.message.includes("not found") || err.message.includes("not own")) {
      return res.status(404).json({ success: false, message: err.message });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ----------------------------------------
// Clear all cart items
// ----------------------------------------
exports.clearCart = async (req, res) => {
  try {
    const userId = getUserId(req);

    const result = await clearUserCart(userId);

    res.json({
      success: true,
      ...result,
    });
  } catch (err) {
    console.error("Clear cart error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ----------------------------------------
// Validate batch cart items
// ----------------------------------------
exports.getBatchItems = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!Array.isArray(req.body.itemIds)) {
      return res.status(400).json({
        success: false,
        message: "itemIds must be an array",
      });
    }

    const result = await validateCartItems(userId, req.body.itemIds);

    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    console.error("Validate batch items error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
