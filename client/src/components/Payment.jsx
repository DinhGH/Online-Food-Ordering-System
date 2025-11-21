/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51SVDCp1piLI9QPmcGlyfGnMNFzEjVjTiZs6F3vcEND2HMD29YbWdGEqD4PBW5aZ8M4KurcjvxLmWK37ksIGcQBUx00HZKnd0ls"
); // key publishable

// Form nhập thông tin người nhận
function ReceiverForm({ onNext }) {
  const [receiver, setReceiver] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) =>
    setReceiver({ ...receiver, [e.target.name]: e.target.value });

  const handleNext = () => {
    if (!receiver.name || !receiver.phone || !receiver.address) {
      alert("Vui lòng điền đầy đủ thông tin người nhận!");
      return;
    }
    localStorage.setItem(
      "receiver",
      JSON.stringify({
        name: receiver.name,
        phone: receiver.phone,
        address: receiver.address,
      })
    );
    onNext(receiver);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-auto rounded-xl shadow space-y-4">
      <h2 className="text-lg font-semibold">Thông tin người nhận</h2>
      <input
        type="text"
        name="name"
        placeholder="Họ và tên"
        value={receiver.name}
        onChange={handleChange}
        className="w-full p-3 border rounded"
      />
      <input
        type="text"
        name="phone"
        placeholder="Số điện thoại"
        value={receiver.phone}
        onChange={handleChange}
        className="w-full p-3 border rounded"
      />
      <input
        type="text"
        name="address"
        placeholder="Địa chỉ"
        value={receiver.address}
        onChange={handleChange}
        className="w-full p-3 border rounded"
      />
      <button
        onClick={handleNext}
        className="w-full py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition"
      >
        Tiếp tục
      </button>
    </div>
  );
}

// Form Stripe PaymentElement
function StripePaymentForm({ clientSecret, onClose, receiverInfo }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);

    // Xử lý thanh toán
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/payment-success",
      },
    });

    if (result.error) alert(result.error.message);
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-auto rounded-xl shadow space-y-4"
    >
      <h2 className="text-lg font-semibold">Phương thức thanh toán</h2>
      <PaymentElement
        options={{ layout: "tabs", fields: { billingDetails: "auto" } }}
      />
      <div className="flex gap-3 mt-4">
        <button
          type="submit"
          className="flex-1 bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
        >
          Thanh toán
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition"
        >
          Hủy
        </button>
      </div>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      )}
    </form>
  );
}

// Component chính
export default function Payment({ amount, onClose }) {
  const [clientSecret, setClientSecret] = useState("");
  const [receiverInfo, setReceiverInfo] = useState(null);

  useEffect(() => {
    async function fetchPaymentIntent() {
      localStorage.setItem("total", amount);
      const res = await fetch("/api/payments/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      const data = await res.json();
      setClientSecret(data.clientSecret);
    }
    fetchPaymentIntent();
  }, [amount]);

  if (!clientSecret) return <div>Đang tạo thanh toán...</div>;

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      {!receiverInfo ? (
        <ReceiverForm onNext={(info) => setReceiverInfo(info)} />
      ) : (
        <StripePaymentForm
          clientSecret={clientSecret}
          receiverInfo={receiverInfo}
          onClose={onClose}
        />
      )}
    </Elements>
  );
}
