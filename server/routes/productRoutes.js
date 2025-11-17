const express = require("express");
const {
  listFoodItems,
  getFoodItems,
  createFoodItems,
  updateFoodItems,
  deleteFoodItems,
} = require("../controllers/productControllers");

const router = express.Router();

// Get all food items
router.get("/", listFoodItems);

// Get a single food item
router.get("/get/:id", getFoodItems);

// Create a new food item
router.post("/create/", createFoodItems);

// Update a food item
router.put("/update/:id", updateFoodItems);

// Delete a food item
router.delete("/delete/:id", deleteFoodItems);

module.exports = router;
