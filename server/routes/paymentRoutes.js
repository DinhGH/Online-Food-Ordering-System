const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount } = req.body;

    if (amount === 0) {
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: { name: "Free Order" },
              unit_amount: 0,
            },
            quantity: 1,
          },
        ],
        success_url: "http://localhost:5173/payment-success",
        cancel_url: "http://localhost:5173/cart",
      });

      return res.json({
        free: true,
        url: session.url,
      });
    }

    const usdAmount = Math.round((amount / 23000) * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: usdAmount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      free: false,
    });
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
