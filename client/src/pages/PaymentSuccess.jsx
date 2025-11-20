import { useEffect } from "react";
import { checkout } from "../service/api.js";

export default function PaymentSuccess() {
  const params = new URLSearchParams(window.location.search);
  const total = params.get("total");

  useEffect(() => {
    // Sau khi thanh toán thành công gọi backend tạo order
    checkout(JSON.parse(localStorage.getItem("cart")));
  }, []);

  return <h1>Thanh toán thành công tổng: {total} VND</h1>;
}
