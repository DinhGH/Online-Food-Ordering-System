import { FaStar } from "react-icons/fa6";

// Hình ảnh với overlay và hiệu ứng mượt
const FoodImage = ({ src, alt }) => (
  <div className="relative w-full h-48 bg-gray-100 overflow-hidden rounded-t-xl">
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
  </div>
);

// Rating bằng sao 123
const RatingStars = ({ rating }) => {
  const fullStars = Math.round(rating || 0);
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => (
        <FaStar
          key={index}
          className={index < fullStars ? "text-yellow-400" : "text-gray-300"}
        />
      ))}
      <span className="text-sm text-gray-600 ml-2">
        {(rating ?? 0).toFixed(1)}/5
      </span>
    </div>
  );
};

export default function FoodCard({ food }) {
  return (
    <div className="group bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5">
      {/* Dùng field image (đúng schema Prisma) */}
      {food.image && <FoodImage src={food.image} alt={food.name} />}

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-lg line-clamp-1" title={food.name}>
            {food.name}
          </h3>
          <span className="shrink-0 rounded-md bg-rose-50 text-rose-600 px-2 py-0.5 text-sm font-semibold">
            {food.price?.toLocaleString("vi-VN")}đ
          </span>
        </div>

        <p className="text-sm text-gray-600 mt-2 line-clamp-2 min-h-[40px]">
          {food.description || ""}
        </p>

        <div className="flex flex-wrap gap-2 mt-3 min-h-[28px]">
          {food.category && (
            <span className="inline-flex items-center rounded-full bg-gray-100 text-gray-700 px-2 py-0.5 text-xs">
              {food.category}
            </span>
          )}
        </div>

        <div className="mt-3">
          <RatingStars rating={food.rating} />
        </div>

        <button className="mt-4 w-full rounded-lg bg-black text-white py-2 text-sm font-semibold hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black/20">
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
}
