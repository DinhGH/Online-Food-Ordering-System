/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { checkout } from "../service/api.js";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function PaymentSuccess() {
  const params = new URLSearchParams(window.location.search);
  const paymentIntentId = params.get("payment_intent");

  const [cartData, setCartData] = useState([]);
  const [receiver, setReceiver] = useState({});
  const [orderSaved, setOrderSaved] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const cartStored = JSON.parse(localStorage.getItem("cart")) || [];
    const receiverStored = JSON.parse(localStorage.getItem("receiver")) || {};
    const totalStored = JSON.parse(localStorage.getItem("total") || "0");

    setTotal(totalStored);
    setCartData(cartStored);
    setReceiver(receiverStored);

    async function saveOrder() {
      if (!paymentIntentId || cartStored.length === 0) return;

      await checkout({
        items: cartStored,
        paymentIntentId,
        totalPaid: total,
        currency: "vnd",
        name: receiverStored.name,
        phone: receiverStored.phone,
        address: receiverStored.address,
      });

      localStorage.removeItem("cart");
      localStorage.removeItem("receiver");
      localStorage.removeItem("total");

      setOrderSaved(true);
    }

    saveOrder();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white p-8 rounded-3xl shadow-xl max-w-lg w-full"
      >
        {/* Icon success */}
        <div className="flex justify-center mb-6">
          <CheckCircle className="text-green-600" size={80} />
        </div>

        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Thanh toán thành công!
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Cảm ơn bạn đã đặt hàng. Đơn hàng của bạn đã được xác nhận.
        </p>

        {/* Receiver info */}
        <div className="mb-4 bg-orange-50 p-4 rounded-xl">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Thông tin người nhận:
          </h2>
          <p className="text-gray-800 font-medium">{receiver.name}</p>
          <p className="text-gray-600">{receiver.phone}</p>
          <p className="text-gray-600">{receiver.address}</p>
        </div>

        {/* Cart items */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            Hóa đơn chi tiết:
          </h2>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {cartData.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center bg-orange-50 p-3 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Số lượng: {item.quantity}
                  </p>
                </div>
                <p className="font-semibold text-orange-600">
                  {(item.quantity * item.price).toLocaleString("vi-VN")} VND
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="bg-orange-100 rounded-xl p-4 mb-6 text-center">
          <p className="text-xl font-semibold text-orange-700">
            Tổng thanh toán:
          </p>
          <p className="text-3xl font-bold text-orange-600 mt-1">
            {total.toLocaleString("vi-VN")} VND
          </p>
        </div>

        {/* Button back home */}
        <a
          href="/"
          className="inline-block w-full bg-orange-600 text-center text-white py-3 rounded-xl text-lg font-semibold shadow-md hover:bg-orange-700 transition"
        >
          Quay về trang chủ
        </a>
      </motion.div>
    </div>
  );
}
