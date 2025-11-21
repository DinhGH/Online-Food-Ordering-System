// checkoutController.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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

// Tạo Order sau khi thanh toán
exports.checkout = async (req, res) => {
  try {
    const { items, paymentIntentId, totalPaid, currency } = req.body;

    if (!paymentIntentId)
      return res.status(400).json({
        success: false,
        message: "Missing paymentIntentId",
      });

    const order = await prisma.order.create({
      data: {
        items,
        totalVnd: totalPaid,
        totalPaid,
        currency,
        paymentIntentId,
        paymentMethod: "stripe",
        paymentStatus: "paid",
      },
    });

    res.json({ success: true, order });
  } catch (err) {
    console.log("CHECKOUT ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
