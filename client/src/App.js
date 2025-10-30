import { BrowserRouter, Routes, Route } from "react-router-dom";
import BOMSummary from "./pages/BOMSummary";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BOMSummary />} />
      </Routes>
    </BrowserRouter>
  );
}
