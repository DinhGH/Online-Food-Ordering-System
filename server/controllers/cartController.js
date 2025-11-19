const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.validateCart = async (req, res) => {
  console.log("Validate request body:", req.body);
  try {
    const items = req.body.items || [];

    const results = await Promise.all(
      items.map(async (item) => {
        if (!item.foodId || !item.quantity) {
          return { ...item, isValid: false, reason: "Invalid item data" };
        }

        const food = await prisma.food.findUnique({
          where: { id: item.foodId },
        });

        if (!food) return { ...item, isValid: false, reason: "Food not found" };
        if (!food.isAvailable)
          return { ...item, isValid: false, reason: "Food not available" };

        return {
          foodId: food.id,
          name: food.name,
          price: food.price,
          quantity: item.quantity,
          subtotal: food.price * item.quantity,
          isValid: true,
        };
      })
    );

    const totalPrice = results
      .filter((i) => i.isValid)
      .reduce((sum, i) => sum + i.subtotal, 0);

    res.json({ success: true, items: results, totalPrice });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.checkout = async (req, res) => {
  try {
    const userId = req.user?.userId || null; // từ JWT, optional
    const items = req.body.items || [];

    // Lọc chỉ những item hợp lệ
    const validItems = await Promise.all(
      items.map(async (item) => {
        const food = await prisma.food.findUnique({
          where: { id: item.foodId },
        });
        if (!food || !food.isAvailable) return null;

        return {
          foodId: food.id,
          name: food.name,
          price: food.price,
          quantity: item.quantity,
          subtotal: food.price * item.quantity,
        };
      })
    );

    const validatedItems = validItems.filter(Boolean);
    if (validatedItems.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No valid items to order" });
    }

    const total = validatedItems.reduce((sum, i) => sum + i.subtotal, 0);

    const order = await prisma.order.create({
      data: {
        userId,
        items: validatedItems,
        total,
        paymentId: null,
      },
    });

    res.json({ success: true, order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};
