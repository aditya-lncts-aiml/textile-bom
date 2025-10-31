import { Routes, Route } from "react-router-dom";
import BOMCalculator  from "./pages/BOMCalculator";
export default function App() {
  return (
      <Routes>
        <Route path="calculator" element={<BOMCalculator />} />
        <Route path="bom" element={<BOMCalculator />} />
        <Route path='/' element={<BOMCalculator />} />
      </Routes>
  );
}