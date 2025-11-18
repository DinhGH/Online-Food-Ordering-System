export const validateCart = async (cart) => {
  const res = await fetch("/api/cart/validate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: cart }),
  });
  return res.json();
};

export const checkout = async (validatedItems) => {
  const res = await fetch("/api/order/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: validatedItems }),
  });
  return res.json();
};
