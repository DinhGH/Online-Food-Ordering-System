import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Star, ShoppingCart } from "lucide-react"; // Dùng icon từ thư viện có sẵn trong package.json của bạn

const FoodDetail = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const navigate = useNavigate();

  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hàm gọi API chi tiết món ăn
  useEffect(() => {
    const fetchFoodDetail = async () => {
      try {
        setLoading(true);
        // Gọi qua proxy đã cấu hình trong vite.config.js (/api -> localhost:3000)
        const response = await fetch(`/api/food-items/get/${id}`);

        if (!response.ok) {
          throw new Error("Không tìm thấy món ăn!");
        }

        const data = await response.json();
        setFood(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchFoodDetail();
    }
  }, [id]);

  // Giao diện khi đang tải
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  // Giao diện khi lỗi
  if (error || !food) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white gap-4">
        <h2 className="text-2xl text-red-500">Đã có lỗi xảy ra</h2>
        <p>{error || "Sản phẩm không tồn tại"}</p>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition"
        >
          Quay lại trang chủ
        </button>
      </div>
    );
  }

  // Giao diện chính
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      {/* Nút quay lại */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" /> Quay lại Menu
      </button>

      <div className="max-w-6xl mx-auto bg-gray-800 rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2">
        {/* Cột trái: Hình ảnh */}
        <div className="relative h-64 md:h-auto overflow-hidden">
          <motion.img
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            src={food.image || "/default-food-image.jpg"}
            alt={food.name}
            className="w-full h-full object-cover"
          />

          <div
            className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-bold shadow-md ${
              food.isAvailable
                ? "bg-green-500 text-white" // Style khi còn món (Màu xanh)
                : "bg-red-600 text-white" // Style khi hết món (Màu đỏ)
            }`}
          >
            {food.isAvailable ? "Còn món" : "Hết hàng"}
          </div>
        </div>

        {/* Cột phải: Thông tin */}
        <div className="p-8 flex flex-col justify-center">
          <div className="mb-4">
            <span className="bg-orange-600 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">
              {food.category || "Món ngon"}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            {food.name}
          </h1>

          {/* Rating */}
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
            {food.description ||
              "Chưa có mô tả cho món ăn này. Hãy thử và cảm nhận hương vị tuyệt vời!"}
          </p>

          <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-700">
            <div className="text-3xl font-bold text-green-400">
              {food.price.toLocaleString("vi-VN")} VNĐ
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!food.isAvailable}
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
    </div>
  );
};

export default FoodDetail;
