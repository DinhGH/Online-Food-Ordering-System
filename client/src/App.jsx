import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import FoodList from "./components/FoodList";

// Các component trang placeholder (để link từ Navbar hoạt động)
const AuthPage = () => (
  <div className="p-10 text-center">Trang Đăng nhập/Đăng ký</div>
);
const ProfilePage = () => (
  <div className="p-10 text-center">Trang Thông tin cá nhân</div>
);
const OrdersPage = () => (
  <div className="p-10 text-center">Trang Đơn hàng của tôi</div>
);

function App() {
  // State quản lý tìm kiếm, được chia sẻ giữa Navbar và FoodList
  const [searchTerm, setSearchTerm] = useState("");

  // State quản lý giỏ hàng (tạm thời)
  // Sau này bạn sẽ lấy số lượng này từ context hoặc API
  const [cartCount, setCartCount] = useState(0);

  // Hàm này sẽ được Navbar gọi khi người dùng nhấn search
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Hàm này được Navbar gọi khi nhấn vào icon giỏ hàng
  const handleCartClick = () => {
    console.log("Cart clicked!");
    // Sau này bạn sẽ implement mở modal giỏ hàng ở đây
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        {/* Navbar luôn hiển thị */}
        <Navbar
          onSearch={handleSearch}
          cartCount={cartCount}
          onCartClick={handleCartClick}
        />

        {/* Nội dung trang sẽ thay đổi theo route */}
        <main>
          <Routes>
            {/* Trang chủ sẽ hiển thị danh sách món ăn */}
            <Route path="/" element={<FoodList searchTerm={searchTerm} />} />

            {/* Các trang khác */}
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/orders" element={<OrdersPage />} />

            {/* Route cho trang không tìm thấy */}
            <Route
              path="*"
              element={
                <div className="p-10 text-center">
                  <h1 className="text-3xl font-bold">404 - Not Found</h1>
                  <Link to="/" className="text-blue-500 hover:underline">
                    Quay về trang chủ
                  </Link>
                </div>
              }
            />
          </Routes>
        </main>

        {/* Bạn có thể thêm Footer ở đây */}
        {/* <Footer /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
