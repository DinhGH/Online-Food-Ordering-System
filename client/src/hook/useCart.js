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
      const index = prev.findIndex((item) => item.foodId === food.id);

      if (index >= 0) {
        const updatedItem = {
          ...prev[index],
          quantity: prev[index].quantity + 1,
        };
        return [...prev.slice(0, index), updatedItem, ...prev.slice(index + 1)];
      } else {
        return [
          ...prev,
          {
            foodId: food.id,
            name: food.name,
            price: food.price,
            quantity: 1,
          },
        ];
      }
    });
  };

  const removeFromCart = (foodId) =>
    setCart((prev) => prev.filter((item) => item.foodId !== foodId));

  const updateQuantity = (foodId, quantity) =>
    setCart((prev) => {
      const index = prev.findIndex((item) => item.foodId === foodId);
      if (index >= 0) prev[index].quantity = quantity;
      return [...prev];
    });

  const clearCart = () => setCart([]);

  return { cart, addToCart, removeFromCart, updateQuantity, clearCart };
};
