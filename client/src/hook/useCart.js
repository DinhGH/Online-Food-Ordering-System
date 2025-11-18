import { useState, useEffect } from "react";

export const useCart = () => {
  const [cart, setCart] = useState(() =>
    JSON.parse(localStorage.getItem("cart") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (food) => {
    setCart((prev) => {
      const index = prev.findIndex((item) => item.id === food.id);

      if (index >= 0) {
        // tạo object mới thay vì sửa trực tiếp
        const updatedItem = {
          ...prev[index],
          quantity: prev[index].quantity + 1,
        };
        return [...prev.slice(0, index), updatedItem, ...prev.slice(index + 1)];
      } else {
        return [...prev, { ...food, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (foodId) =>
    setCart((prev) => prev.filter((item) => item.id !== foodId));

  const updateQuantity = (foodId, quantity) => {
    setCart((prev) => {
      const index = prev.findIndex((item) => item.id === foodId);
      if (index >= 0) prev[index].quantity = quantity;
      return [...prev];
    });
  };

  const clearCart = () => setCart([]);

  return { cart, addToCart, removeFromCart, updateQuantity, clearCart };
};
