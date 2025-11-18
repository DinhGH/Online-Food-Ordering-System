// src/service/api.js

// Validate giỏ hàng
export const validateCart = async (cart) => {
  const res = await fetch("/api/cart/validate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: cart }),
  });
  return res.json();
};

// Checkout giỏ hàng (tạo order)
export const checkout = async (cart) => {
  const res = await fetch("/api/cart/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: cart }),
  });
  return res.json();
};
