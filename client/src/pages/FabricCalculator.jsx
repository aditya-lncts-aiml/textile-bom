import React, { useState, useEffect } from "react";

export default function FabricCalculator({ onFabricChange, resetSignal }) {
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [pricePerMeter, setPricePerMeter] = useState(0);

  const totalCost = (length * width * pricePerMeter) / 100;

  useEffect(() => {
    onFabricChange(totalCost);
  }, [totalCost, onFabricChange]);

  // ✅ Reset inputs when resetSignal changes
  useEffect(() => {
    setLength(0);
    setWidth(0);
    setPricePerMeter(0);
  }, [resetSignal]);

  return (
    <div className="space-y-4 text-white">
      <div>
        <label className="block text-gray-400">Length (cm)</label>
        <input
          type="number"
          value={length}
          onChange={(e) => setLength(parseFloat(e.target.value))}
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
        />
      </div>
      <div>
        <label className="block text-gray-400">Width (cm)</label>
        <input
          type="number"
          value={width}
          onChange={(e) => setWidth(parseFloat(e.target.value))}
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
        />
      </div>
      <div>
        <label className="block text-gray-400">Price per meter (₹)</label>
        <input
          type="number"
          value={pricePerMeter}
          onChange={(e) => setPricePerMeter(parseFloat(e.target.value))}
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
        />
      </div>
      <div className="mt-4 text-cyan-400 font-semibold">
        Total Fabric Cost: ₹{isNaN(totalCost.toFixed(2))?0.00:totalCost.toFixed(2)}
      </div>
    </div>
  );
}
