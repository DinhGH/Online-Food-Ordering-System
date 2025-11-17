import { Routes, Route } from "react-router-dom";
import "./App.css";

import FoodList from "./pages/FoodList.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<FoodList />} />
    </Routes>
  );
}
