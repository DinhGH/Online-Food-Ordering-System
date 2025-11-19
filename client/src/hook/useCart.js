// ---------------------- useCart.js ----------------------
import { useState, useEffect } from "react";

export const useCart = () => {
  const [cart, setCart] = useState(() =>
    JSON.parse(localStorage.getItem("cart") || "[]")
  );

  // Cập nhật localStorage mỗi lần cart thay đổi
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Thêm vào giỏ hàng
  const addToCart = (food) => {
    setCart((prev) => {
      const exist = prev.find((item) => item.id === food.id);

      if (exist) {
        return prev.map((item) =>
          item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      // lưu đủ thông tin: id, name, price, image, quantity
      return [
        ...prev,
        {
          id: food.id,
          name: food.name,
          price: food.price,
          image: food.image,
          quantity: 1,
        },
      ];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) return;

    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  return { cart, addToCart, removeFromCart, updateQuantity, clearCart };
};
