/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // [1. Import useNavigate]

const FoodItem = ({ food }) => {
  const navigate = useNavigate(); // [2. Khởi tạo hook navigate]

  // [3. Hàm xử lý khi bấm nút]
  const handleViewDetail = () => {
    navigate(`/food/${food.id}`);
  };

  return (
    <motion.div
      className="bg-gray-800 text-white rounded-lg shadow-lg p-4"
      whileHover={{ scale: 1.02 }} // Giảm scale hover container một chút cho đỡ giật
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Hình ảnh món ăn */}
      <motion.div
        className="overflow-hidden rounded-md mb-4 cursor-pointer" // Thêm cursor pointer
        onClick={handleViewDetail} // Bấm vào ảnh cũng chuyển trang
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <img
          src={food.image || "/default-food-image.jpg"}
          alt={food.name}
          className="w-full h-48 object-cover"
        />
      </motion.div>

      {/* Tên món ăn */}
      <h3
        className="text-xl font-semibold mb-2 cursor-pointer hover:text-orange-400 transition-colors"
        onClick={handleViewDetail}
      >
        {food.name}
      </h3>

      {/* Rating */}
      <div className="flex items-center mb-4">
        <span className="text-yellow-400 mr-2">Đánh giá:</span>
        {Array.from({ length: 5 }, (_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${
              i < Math.floor(food.rating || 0)
                ? "text-yellow-400"
                : "text-gray-600"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="text-gray-300 ml-2">({food.rating || 0}/5)</span>
      </div>

      {/* Giá + Button */}
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold text-green-500">
          {food.price.toLocaleString()} VNĐ
        </span>

        <motion.button
          className="bg-[#1b1a1a] text-white px-4 py-2 rounded-md shadow-md shadow-gray-600 hover:bg-orange-700" // Thêm màu hover
          whileHover={{ y: -3, scale: 1.05 }}
          whileTap={{ y: 2, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          onClick={handleViewDetail} // [4. Gắn sự kiện click]
        >
          Xem chi tiết
        </motion.button>
      </div>
    </motion.div>
  );
};

export default FoodItem;
