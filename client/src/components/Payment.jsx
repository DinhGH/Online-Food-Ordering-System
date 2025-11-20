import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51SVDCp1piLI9QPmcGlyfGnMNFzEjVjTiZs6F3vcEND2HMD29YbWdGEqD4PBW5aZ8M4KurcjvxLmWK37ksIGcQBUx00HZKnd0ls");

function CheckoutForm({ clientSecret, onClose }) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: "http://localhost:5173/payment-success" },
    });

    if (result.error) alert(result.error.message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement
        options={{
          layout: "tabs",
          paymentMethodOrder: ["google_pay", "apple_pay", "card"],
          fields: { billingDetails: "never" }
        }}
      />
      
      <div className="mt-4 flex gap-2">
        <button
          type="submit"
          disabled={!stripe}
          className="bg-orange-600 text-white px-4 py-2 rounded flex-1"
        >
          Thanh toán
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-600 text-white px-4 py-2 rounded flex-1"
        >
          Hủy
        </button>
      </div>
    </form>
  );
}

export default function Payment({ amount, onClose }) {
  const [clientSecret, setClientSecret] = useState("");
  const [isFreeOrder, setIsFreeOrder] = useState(false);

  useEffect(() => {
    async function fetchPaymentIntent() {
      const res = await fetch("/api/payments/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      const data = await res.json();

      // Đơn free -> redirect thẳng sang Stripe Checkout
      if (data.free) {
        setIsFreeOrder(true);
        window.location.href = data.url;
        return;
      }

      // Đơn có tiền
      setClientSecret(data.clientSecret);
    }

    fetchPaymentIntent();
  }, [amount]);

  if (isFreeOrder) return <div>Đang xác nhận đơn miễn phí...</div>;
  if (!clientSecret) return <div>Đang tạo thanh toán...</div>;

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm clientSecret={clientSecret} onClose={onClose} />
    </Elements>
  );
}
