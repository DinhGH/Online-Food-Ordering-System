/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Star, ShoppingCart } from "lucide-react";
import { useCart } from "../hook/useCart.js";
import Toast from "../components/Toast.jsx";

const FoodDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = query.get("page") || 1;

  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchFoodDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/food-items/get/${id}`);
        if (!response.ok) throw new Error("Không tìm thấy món ăn!");
        const data = await response.json();
        setFood(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchFoodDetail();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );

  if (error || !food)
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white gap-4">
        <h2 className="text-2xl text-red-500">Đã có lỗi xảy ra</h2>
        <p>{error || "Sản phẩm không tồn tại"}</p>
        <button
          onClick={() => navigate(`/?page=${page}`)}
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition"
        >
          Quay lại Menu
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <button
        onClick={() => navigate(`/?page=${page}`)}
        className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" /> Quay lại Menu
      </button>

      {/* Thông tin chi tiết */}
      <div className="max-w-6xl mx-auto bg-gray-800 rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2">
        <div className="relative h-64 md:h-96 overflow-hidden rounded-tl-2xl rounded-bl-2xl">
          <motion.img
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            src={food.image || "/default-food-image.jpg"}
            alt={food.name}
            className="w-full h-full object-cover max-h-[400px]" // Giới hạn chiều cao
          />
          <div
            className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-bold shadow-md ${
              food.isAvailable
                ? "bg-green-500 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {food.isAvailable ? "Còn món" : "Hết hàng"}
          </div>
        </div>

        <div className="p-8 flex flex-col justify-center">
          <div className="mb-4">
            <span className="bg-orange-600 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">
              {food.category || "Món ngon"}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            {food.name}
          </h1>

          <div className="flex items-center mb-6">
            <div className="flex text-yellow-400 mr-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(food.rating)
                      ? "fill-current"
                      : "text-gray-600"
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-400 text-sm">({food.rating} / 5)</span>
          </div>

          <p className="text-gray-300 mb-8 leading-relaxed text-lg">
            {food.description || "Chưa có mô tả cho món ăn này."}
          </p>

          <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-700">
            <div className="text-3xl font-bold text-green-400">
              {food.price.toLocaleString("vi-VN")} VNĐ
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!food.isAvailable}
              onClick={() => {
                addToCart(food);
                setToast({
                  status: "success",
                  message: "Đã thêm vào giỏ hàng!",
                });
              }}
              className={`flex items-center px-6 py-3 rounded-lg font-semibold shadow-lg transition-all ${
                food.isAvailable
                  ? "bg-orange-600 hover:bg-orange-500 text-white"
                  : "bg-gray-600 cursor-not-allowed text-gray-400"
              }`}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {food.isAvailable ? "Thêm vào giỏ" : "Hết hàng"}
            </motion.button>
          </div>
        </div>
      </div>

      {toast && (
        <Toast
          status={toast.status}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default FoodDetail;
