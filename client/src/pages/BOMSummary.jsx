import React, { useState } from "react";
import FabricCalculator from "./FabricCalculator";
import AccessoryCalculator from "./AccessoryCalculator";

export default function BOMSummary() {
  const [fabricCost, setFabricCost] = useState(0);
  const [accessoryCost, setAccessoryCost] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [resetSignal, setResetSignal] = useState(false);

  const handleFabricChange = (cost) => setFabricCost(cost);
  const handleAccessoryChange = (cost) => setAccessoryCost(cost);

  const totalCost = fabricCost + accessoryCost;
  const estimateMin = totalCost * 0.95;
  const estimateMax = totalCost * 1.05;

  // ✅ reset button logic (no hooks here)
  const handleResetAll = () => {
    setFabricCost(0);
    setAccessoryCost(0);
    setShowResult(false);
    setResetSignal((prev) => !prev); // toggle signal
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black flex flex-col items-center justify-start py-12 px-4">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-md">
        Textile BOM Calculator
      </h1>

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="backdrop-blur-md bg-white/10 p-8 rounded-3xl border border-white/20 shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Fabric Calculator
          </h2>
          <FabricCalculator onFabricChange={handleFabricChange} resetSignal={resetSignal} />
        </div>

        <div className="backdrop-blur-md bg-white/10 p-8 rounded-3xl border border-white/20 shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Accessory Calculator
          </h2>
          <AccessoryCalculator onAccessoryChange={handleAccessoryChange} resetSignal={resetSignal} />
        </div>
      </div>

      <div className="mt-10 flex gap-6">
        <button
          onClick={() => setShowResult(true)}
          className="px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
        >
          🚀 Generate BOM
        </button>

        <button
          onClick={handleResetAll}
          className="px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-red-500 to-pink-600 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
        >
          🔁 Reset All
        </button>
      </div>

      {showResult && (
        <div className="mt-12 w-full max-w-lg backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl shadow-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Final BOM Summary
          </h3>
          <p className="text-gray-300 mb-2">
            <span className="font-semibold text-cyan-400">Fabric Cost:</span> ₹{fabricCost.toFixed(2)}
          </p>
          <p className="text-gray-300 mb-2">
            <span className="font-semibold text-blue-400">Accessories Cost:</span> ₹{accessoryCost.toFixed(2)}
          </p>
          <hr className="my-4 border-gray-600" />
          <p className="text-lg">
            <span className="font-semibold text-green-400">Total Cost:</span> ₹{totalCost.toFixed(2)}
          </p>
          <p className="text-gray-400 mt-1">
            Estimated Range: ₹{estimateMin.toFixed(2)} – ₹{estimateMax.toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
}
