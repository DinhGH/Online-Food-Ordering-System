import { useState, useEffect } from "react";
import axios from "axios";
import FoodCard from "./FoodCard.jsx";
import SkeletonCard from "./SkeletonCard.jsx";

const API_URL = "/api";

export default function FoodList({ searchTerm }) {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFoods = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `${API_URL}/food-items?search=${searchTerm}`
        );
        setFoods(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch foods:", err);
        setError("Không thể tải danh sách món ăn");
        setFoods([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, [searchTerm]);

  const renderGridContent = () => {
    if (loading) {
      return (
        <>
          {[...Array(8)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </>
      );
    }

    if (error) {
      return (
        <div className="col-span-full">
          <div className="rounded-xl bg-red-50 border border-red-100 p-8 text-center">
            <p className="text-red-600 font-medium">{error}</p>
            <p className="text-sm text-red-400 mt-1">Vui lòng thử lại sau.</p>
          </div>
        </div>
      );
    }

    if (foods.length === 0) {
      return (
        <div className="col-span-full">
          <div className="rounded-xl bg-gray-50 border border-gray-200 p-10 text-center">
            <div className="mx-auto mb-3 w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              🍽️
            </div>
            <p className="text-gray-700 font-medium">
              Không tìm thấy món ăn nào.
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Hãy thử tìm từ khóa khác hoặc thêm dữ liệu.
            </p>
          </div>
        </div>
      );
    }

    return (
      <>
        {foods.map((food) => (
          <FoodCard key={food.id} food={food} />
        ))}
      </>
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero header */}
      <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 min-h-[32vh] flex items-center justify-center">
          <div className="max-w-5xl mx-auto w-full text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Khám phá thực đơn
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-300">
              Những món ăn được chuẩn bị kỹ lưỡng với nguyên liệu tươi ngon. Hãy tìm món bạn yêu thích!
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Thực đơn</h2>
          {/* Placeholder cho bộ lọc sau này */}
          <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
            <span className="px-3 py-1 rounded-full bg-gray-100 border border-gray-200">
              Tất cả
            </span>
            <span className="px-3 py-1 rounded-full bg-gray-50 border border-gray-200">
              Món nước
            </span>
            <span className="px-3 py-1 rounded-full bg-gray-50 border border-gray-200">
              Cơm
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {renderGridContent()}
        </div>
      </section>
    </div>
  );
}
