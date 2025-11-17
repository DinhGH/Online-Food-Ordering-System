const productService = require("../services/productService");

// --- List food items ---
const listFoodItems = async (req, res) => {
  try {
    const { page, limit, category, search } = req.query;
    const result = await productService.listFoodItems({
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 12,
      category,
      search,
    });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// --- Get single food item by ID ---
const getFoodItems = async (req, res) => {
  try {
    const food = await productService.getFoodItemById(req.params.id);
    if (!food) return res.status(404).json({ message: "Food item not found" });
    res.json(food);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// --- Create food item ---
const createFoodItems = async (req, res) => {
  try {
    const food = await productService.createFoodItem(req.body);
    res.status(201).json(food);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// --- Update food item ---
const updateFoodItems = async (req, res) => {
  try {
    const updated = await productService.updateFoodItem(
      req.params.id,
      req.body
    );
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// --- Delete food item ---
const deleteFoodItems = async (req, res) => {
  try {
    await productService.deleteFoodItem(req.params.id);
    res.json({ message: "Food item deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// --- Get all categories ---
const getCategoriesController = async (req, res) => {
  try {
    const categories = await productService.getCategories();
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  listFoodItems,
  getFoodItems,
  createFoodItems,
  updateFoodItems,
  deleteFoodItems,
  getCategoriesController,
};
