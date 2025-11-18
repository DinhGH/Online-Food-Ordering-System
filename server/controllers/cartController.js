// checkoutController.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.checkout = async (req, res) => {
  try {
    const userId = req.user.userId; // từ JWT
    const items = req.body.items || [];

    let total = 0;
    const validatedItems = [];

    for (const item of items) {
      const food = await prisma.food.findUnique({ where: { id: item.foodId } });
      if (!food || !food.isAvailable) continue;

      const subtotal = food.price * item.quantity;
      total += subtotal;

      validatedItems.push({
        foodId: food.id,
        name: food.name,
        price: food.price,
        quantity: item.quantity,
        subtotal,
      });
    }

    if (validatedItems.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No valid items to order" });
    }

    const order = await prisma.order.create({
      data: {
        items: validatedItems,
        total,
        paymentId: null,
      },
    });

    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
exports.validateCart = async (req, res) => {
  try {
    const items = req.body.items || [];

    const results = await Promise.all(
      items.map(async (item) => {
        const food = await prisma.food.findUnique({
          where: { id: item.foodId },
        });

        if (!food) return { ...item, isValid: false, reason: "Food not found" };
        if (!food.isAvailable)
          return { ...item, isValid: false, reason: "Food not available" };

        return {
          ...item,
          isValid: true,
          price: food.price,
          subtotal: food.price * item.quantity,
        };
      })
    );

    const totalPrice = results
      .filter((i) => i.isValid)
      .reduce((sum, i) => sum + i.subtotal, 0);

    res.json({ success: true, items: results, totalPrice });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
