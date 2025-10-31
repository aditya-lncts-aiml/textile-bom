import { Routes, Route } from "react-router-dom";
// import BOMSummary from "./pages/BOMSummary";
import BOMCalculator from "./pages/BOMCalculator";

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<BOMCalculator />} />
      </Routes>
  );
}
