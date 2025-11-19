import { Routes, Route } from "react-router-dom";
import "./App.css";

import FoodList from "./pages/FoodList.jsx";
import FoodDetail from "./pages/FoodDetail.jsx";
import Cart from "./pages/Cart.jsx";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<FoodList />} />
      <Route path="/food/:id" element={<FoodDetail />} />
    </Routes>
  );
}
