const express = require("express");
const {
  addCart,
  getCart,
  updateQuantity,
  deleteItem,
  clearCart,
  getBatchItems,
} = require("../controllers/cartController");

const router = express.Router();

router.post("/add", addCart);
router.get("/", getCart);
router.put("/:id", updateQuantity);
router.delete("/:id", deleteItem);
router.delete("/", clearCart);
router.post("/validate", getBatchItems);

module.exports = router;
