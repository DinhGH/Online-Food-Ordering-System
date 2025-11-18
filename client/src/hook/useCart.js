import { useState, useEffect } from "react";

// Hook quản lý giỏ hàng localStorage
export const useCart = () => {
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (foodId, quantity = 1) => {
    setCart((prev) => {
      const index = prev.findIndex((item) => item.foodId === foodId);
      if (index >= 0) prev[index].quantity += quantity;
      else prev.push({ foodId, quantity });
      return [...prev];
    });
  };

  const removeFromCart = (foodId) => {
    setCart((prev) => prev.filter((item) => item.foodId !== foodId));
  };

  const updateQuantity = (foodId, quantity) => {
    setCart((prev) => {
      const index = prev.findIndex((item) => item.foodId === foodId);
      if (index >= 0) prev[index].quantity = quantity;
      return [...prev];
    });
  };

  const clearCart = () => setCart([]);

  return { cart, addToCart, removeFromCart, updateQuantity, clearCart };
};
