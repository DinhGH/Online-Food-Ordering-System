/* eslint-disable no-unused-vars */
// ---------------------- Cart.jsx ----------------------
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Cart = ({ cart, updateQuantity, removeFromCart, clearCart, onClose }) => {
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <AnimatePresence>
      {/* Overlay */}
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        className="fixed right-0 top-0 h-full w-[380px] max-w-[90vw] bg-[#1b1b1d] shadow-xl z-50 p-6 flex flex-col"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{
          x: "100%",
          transition: { type: "spring", stiffness: 50, damping: 20 },
        }}
        transition={{ type: "spring", stiffness: 80, damping: 18 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-3">
          <h1 className="text-2xl font-semibold text-white">Giỏ hàng</h1>
          <button
            className="text-gray-300 hover:text-white text-xl"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {cart.length === 0 ? (
            <p className="text-gray-400 text-center mt-4">
              Chưa có sản phẩm trong giỏ.
            </p>
          ) : (
            cart.map((item) => (
              <motion.div
                key={item.id}
                className="bg-gray-800 p-3 rounded-xl flex items-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* Ảnh sản phẩm - Bên trái, thu nhỏ để hài hòa */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 md:w-16 md:h-16 rounded-lg object-cover shrink-0"
                />

                {/* Phần thông tin bên phải - Chia thành tên/giá và controls */}
                <div className="flex-1 flex flex-col justify-between h-full">
                  {/* Tên và giá sản phẩm - Phần trên */}
                  <div className="flex flex-col gap-1">
                    <div className="font-semibold text-white text-sm md:text-base">
                      {item.name}
                    </div>
                    <div className="text-gray-400 text-xs md:text-sm">
                      {item.price.toLocaleString()} VNĐ / sản phẩm
                    </div>
                  </div>

                  {/* Controls: Số lượng, Tổng giá, Nút xóa - Phần dưới, căn đều */}
                  <div className="flex items-center justify-between mt-2 gap-1">
                    {/* Số lượng */}
                    <div className="flex items-center gap-1">
                      <label className="text-gray-300 text-xs md:text-sm">
                        SL:
                      </label>
                      <input
                        type="number"
                        value={item.quantity}
                        min={1}
                        onChange={(e) =>
                          updateQuantity(item.id, Number(e.target.value))
                        }
                        className="w-12 md:w-14 rounded-md px-1 py-1 text-gray-300 text-center border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs md:text-sm"
                      />
                    </div>

                    {/* Tổng giá - Nổi bật hơn */}
                    <div className="text-green-600 font-bold text-xs md:text-sm text-right min-w-[60px]">
                      {(item.price * item.quantity).toLocaleString()} VNĐ
                    </div>

                    {/* Nút xóa - Bên phải, dễ nhấn */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-red-600 px-2 py-1 rounded-md hover:bg-red-500 transition-colors text-xs font-medium"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <motion.div
            className="mt-4 border-t border-gray-700 pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-right text-lg font-bold mb-4">
              Tổng: {totalPrice.toLocaleString()} VNĐ
            </div>
            <button
              onClick={() => {
                alert("Đặt hàng thành công!");
                clearCart();
                onClose();
              }}
              className="w-full bg-orange-600 hover:bg-orange-700 py-3 rounded-lg text-white font-semibold"
            >
              Thanh toán
            </button>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default Cart;