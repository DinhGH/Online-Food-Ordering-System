export default function SkeletonCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* Khung ảnh */}
      <div className="w-full h-48 bg-gray-300"></div>

      <div className="p-4">
        {/* Khung tiêu đề */}
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>

        {/* Khung giá */}
        <div className="h-5 bg-gray-300 rounded w-1/4 mb-3"></div>

        {/* Khung mô tả */}
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6 mb-3"></div>

        {/* Khung tags */}
        <div className="flex gap-2 mb-3">
          <div className="h-5 bg-gray-300 rounded-full w-16"></div>
          <div className="h-5 bg-gray-300 rounded-full w-20"></div>
        </div>

        {/* Khung rating */}
        <div className="h-5 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  );
}
