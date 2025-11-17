import React, { useState, useEffect } from "react";
import FoodItem from "../components/FoodItem";

const FoodList = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination state
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 12; // 12 sản phẩm mỗi trang

  // Hàm fetch data từ API với page
  const fetchFoods = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/api/food-items?page=${pageNumber}&limit=${limit}`
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

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Đang tải...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-400 text-xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <h1 className="text-4xl font-semibold text-white pb-4 text-center ">
        MENU
      </h1>

      {foods.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {foods.map((food) => (
              <FoodItem key={food.id} food={food} />
            ))}
          </div>

          {/* Pagination */}
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
    </div>
  );
};

export default FoodList;
