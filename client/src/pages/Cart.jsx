import React, { useEffect, useState } from "react";
import { useCart } from "../hook/useCart.js"; // từ pages đi lên 1 cấp + vào hooks
import { validateCart, checkout } from "../service/api.js";


const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [validatedCart, setValidatedCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Validate giỏ hàng khi mở trang
  useEffect(() => {
  const fetchValidated = async () => {
    if (cart.length === 0) {
      setValidatedCart([]);
      setTotalPrice(0);
      return;
    }

    const res = await validateCart(cart);
    if (res.success) {
      setValidatedCart(res.items);
      setTotalPrice(res.totalPrice);
    }
  };

  fetchValidated();
}, [cart]); // ✅ mỗi khi cart thay đổi, validate lại


 const handleCheckout = async () => {
  const validItems = validatedCart.filter((i) => i.isValid);
  if (validItems.length === 0) {
    alert("Không có sản phẩm hợp lệ để đặt hàng");
    return;
  }

  try {
    const res = await checkout(validItems);
    if (res.success) {
      alert("Đặt hàng thành công!");
      clearCart();
      setValidatedCart([]);
      setTotalPrice(0);
    } else {
      alert("Đặt hàng thất bại: " + res.message);
    }
  } catch (err) {
    console.error(err);
    alert("Đặt hàng thất bại, vui lòng thử lại");
  }
};


  return (
    <div className="min-h-screen bg-gray-900 p-8 text-white">
      <h1 className="text-3xl mb-6">Giỏ hàng</h1>
      {validatedCart.length === 0 ? (
        <p>Chưa có sản phẩm trong giỏ.</p>
      ) : (
        <div className="space-y-4">
          {validatedCart
  .filter((item) => item.isValid) // chỉ render item hợp lệ
  .map((item) => {
    const key = item.foodId || item.id;
    return (
      <div key={key} className="flex justify-between items-center bg-gray-800 p-4 rounded">
        <div>
          <div className="font-bold">{item.name}</div>
          <div className="text-gray-400">
            {item.price?.toLocaleString() ?? "-"} VNĐ
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="number"
            value={item.quantity}
            min={1}
            onChange={(e) => updateQuantity(item.foodId || item.id, Number(e.target.value))}
            className="w-16 text-black px-2 rounded"
          />
          <button
            onClick={() => removeFromCart(item.foodId || item.id)}
            className="bg-red-600 px-3 py-1 rounded hover:bg-red-500"
          >
            Xóa
          </button>
        </div>

        <div>{item.subtotal?.toLocaleString() ?? "-"} VNĐ</div>
      </div>
    );
  })}


          <div className="mt-4 text-right text-xl font-bold">
            Tổng: {totalPrice.toLocaleString()} VNĐ
          </div>
          <button
            onClick={handleCheckout}
            className="mt-4 bg-green-600 px-6 py-3 rounded-lg hover:bg-green-500"
          >
            Thanh toán
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
