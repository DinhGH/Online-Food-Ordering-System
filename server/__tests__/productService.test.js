const productService = require("../services/productService");
const { PrismaClient } = require("@prisma/client");

// Mock PrismaClient
jest.mock("@prisma/client", () => {
  const mPrisma = {
    food: {
      findMany: jest.fn(),
      count: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mPrisma) };
});

const prisma = new PrismaClient();

describe("Product Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("listFoodItems should return paginated data", async () => {
    const mockFoods = [{ id: 1, name: "Pizza" }];
    prisma.food.findMany.mockResolvedValue(mockFoods);
    prisma.food.count.mockResolvedValue(1);

    const result = await productService.listFoodItems({ page: 1, limit: 10 });

    expect(result.data).toEqual(mockFoods);
    expect(result.total).toBe(1);
    expect(prisma.food.findMany).toHaveBeenCalled();
  });

  test("getFoodItemById should call findUnique with correct ID", async () => {
    const mockFood = { id: 1, name: "Pizza" };
    prisma.food.findUnique.mockResolvedValue(mockFood);

    const result = await productService.getFoodItemById(1);

    expect(result).toEqual(mockFood);
    expect(prisma.food.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});
