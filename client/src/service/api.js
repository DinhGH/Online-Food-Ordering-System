// src/service/api.js
const API_URL = import.meta.env.VITE_API_URL;
// Validate giỏ hàng
export const validateCart = async (cart) => {
  const res = await fetch(`${API_URL}/api/cart/validate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: cart }),
  });
  return res.json();
};

// Checkout giỏ hàng (tạo order)
export const checkout = async (data) => {
  const res = await fetch(`${API_URL}/api/cart/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const createPaymentIntent = async (amount) => {
  const res = await fetch(`${API_URL}/api/payments/create-payment-intent`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount }),
  });
  return res.json();
};
