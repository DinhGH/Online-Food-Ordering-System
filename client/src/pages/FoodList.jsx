/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import FoodItem from "../components/FoodItem";
import Cart from "./Cart";

const FoodList = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const initialPage = parseInt(query.get("page") || "1", 10);

  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 12;

  const [showCart, setShowCart] = useState(false);

  // ---------------------- Cart State ----------------------
  const [cart, setCart] = useState(() =>
    JSON.parse(localStorage.getItem("cart") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (food) => {
    setCart((prev) => {
      const exist = prev.find((item) => item.id === food.id);
      if (exist) {
        return prev.map((item) =>
          item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
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

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((item) => item.id !== id));
  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) return;
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };
  const clearCart = () => setCart([]);

  // ---------------------- Fetch foods ----------------------
  const fetchFoods = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/food-items?page=${pageNumber}&limit=${limit}`
      );
      if (!response.ok) throw new Error("Failed to fetch foods");

      const result = await response.json();
      setFoods(Array.isArray(result.data) ? result.data : []);
      setPage(result.page || 1);
      setTotalPages(result.totalPages || 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods(page);
  }, [page]);

  const navigate = useNavigate();
  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
      navigate(`/?page=${page - 1}`, { replace: true });
    }
  };
  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
      navigate(`/?page=${page + 1}`, { replace: true });
    }
  };

  // ---------------------- Render ----------------------
  if (loading)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-400 text-xl">Error: {error}</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 p-8 relative">
      <h1 className="text-4xl font-semibold text-white pb-4 text-center">
        MENU
      </h1>

      {foods.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {foods.map((food) => (
              <FoodItem
                key={food.id}
                food={food}
                addToCart={addToCart}
                currentPage={page}
              />
            ))}
          </div>

          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={handlePrev}
              disabled={page === 1}
              className={`px-4 py-2 rounded-md shadow-sm shadow-gray-700 transition-all duration-200 ${
                page === 1
                  ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                  : "bg-[#151516] text-white hover:bg-[#000000] hover:shadow-md"
              }`}
            >
              Trước
            </button>
            <span className="text-white px-2 py-2">
              Trang {page} trên {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={page === totalPages}
              className={`px-4 py-2 rounded-md shadow-sm shadow-gray-700 transition-all duration-200 ${
                page === totalPages
                  ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                  : "bg-[#151516] text-white hover:bg-[#000000] hover:shadow-md"
              }`}
            >
              Tiếp
            </button>
          </div>
        </>
      ) : (
        <div className="text-center text-gray-400 mt-8">
          Chưa có sẵn món ăn và thức uống.
        </div>
      )}

      {/* Cart Button */}
      <motion.button
        onClick={() => setShowCart(true)}
        className="fixed bottom-6 right-6 bg-auto text-white w-16 h-16 rounded-full shadow-lg shadow-gray-400 flex items-center justify-center text-2xl z-50 cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ scale: [1, 1.09, 1] }}
        transition={{ repeat: Infinity, repeatType: "loop", duration: 1.1 }}
      >
        🛒
        <AnimatePresence>
          {cart.length > 0 && (
            <motion.span
              key={cart.reduce((acc, item) => acc + item.quantity, 0)}
              className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              {cart.reduce((acc, item) => acc + item.quantity, 0)}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Cart Modal */}
      {showCart && (
        <Cart
          cart={cart}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          onClose={() => setShowCart(false)}
        />
      )}
    </div>
  );
};

export default FoodList;
