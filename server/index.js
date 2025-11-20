const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");
const foodRoutes = require("./routes/productRoutes");
const cardRoutes = require("./routes/cartRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// --- Test route ---
app.get("/", (req, res) => {
  res.send("API server is running...");
});

// --- Correct way to use router ---
app.use("/api/food-items", foodRoutes);
app.use("/api/cart", cardRoutes);
app.use("/api/payments", paymentRoutes);

// --- Start server ---
prisma
  .$connect()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running on http://localhost:3000");
    });
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });
