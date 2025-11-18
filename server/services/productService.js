const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// --- List food items with pagination, search, filter ---
const listFoodItems = async ({ page = 1, limit = 12, category, search }) => {
  const skip = (page - 1) * limit;

  const where = {};
  if (category) where.category = category;
  if (search) where.name = { contains: search, mode: "insensitive" };
  const [foods, total] = await Promise.all([
    prisma.food.findMany({
      skip,
      take: limit,
      where,
      orderBy: { id: "asc" },
    }),
    prisma.food.count({ where }),
  ]);

  return {
    data: foods,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

// --- Get single food item by ID ---
const getFoodItemById = async (id) => {
  return prisma.food.findUnique({
    where: { id: Number(id) },
    // Tương tự, hàm này sẽ trả về đầy đủ: id, name, price, rating, description, category, image, isAvailable...
  });
};

// --- Create a food item ---
const createFoodItem = async (data) => {
  return prisma.food.create({ data });
};

// --- Update a food item ---
const updateFoodItem = async (id, data) => {
  return prisma.food.update({
    where: { id: Number(id) },
    data,
  });
};

// --- Delete a food item ---
const deleteFoodItem = async (id) => {
  return prisma.food.delete({
    where: { id: Number(id) },
  });
};

// --- Get distinct categories ---
const getCategories = async () => {
  const categories = await prisma.food.findMany({
    distinct: ["category"],
    select: { category: true },
  });
  return categories.map((c) => c.category);
};

module.exports = {
  listFoodItems,
  getFoodItemById,
  createFoodItem,
  updateFoodItem,
  deleteFoodItem,
  getCategories,
};
