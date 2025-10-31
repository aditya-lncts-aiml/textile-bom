import React, { useState, useEffect } from "react";

export default function AccessoryCalculator({ onAccessoryChange, resetSignal }) {
  const [buttonsQty, setButtonsQty] = useState(0);
  const [buttonPrice, setButtonPrice] = useState(0);

  const [zippersQty, setZippersQty] = useState(0);
  const [zipperPrice, setZipperPrice] = useState(0);

  const [threadsQty, setThreadsQty] = useState(0);
  const [threadPrice, setThreadPrice] = useState(0);

  // 🧮 Total accessory cost
  const totalAccessoryCost =
    buttonsQty * buttonPrice + zippersQty * zipperPrice + threadsQty * threadPrice;

  // Notify parent
  useEffect(() => {
    onAccessoryChange(totalAccessoryCost);
  }, [totalAccessoryCost, onAccessoryChange]);

  // 🔁 Reset when resetSignal changes
  useEffect(() => {
    setButtonsQty(0);
    setButtonPrice(0);
    setZippersQty(0);
    setZipperPrice(0);
    setThreadsQty(0);
    setThreadPrice(0);
  }, [resetSignal]);

  return (
    <div className="space-y-6 text-white">
      {/* Buttons */}
      <div>
        <h3 className="text-xl font-semibold text-cyan-400 mb-2">Buttons</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-gray-400">Quantity</label>
            <input
              type="number"
              value={buttonsQty}
              onChange={(e) => setButtonsQty(parseFloat(e.target.value))}
              className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            />
          </div>
          <div>
            <label className="block text-gray-400">Price per piece (₹)</label>
            <input
              type="number"
              value={buttonPrice}
              onChange={(e) => setButtonPrice(parseFloat(e.target.value) )}
              className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            />
          </div>
        </div>
      </div>

      {/* Zippers */}
      <div>
        <h3 className="text-xl font-semibold text-cyan-400 mb-2">Zippers</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-gray-400">Quantity</label>
            <input
              type="number"
              value={zippersQty}
              onChange={(e) => setZippersQty(parseFloat(e.target.value))}
              className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            />
          </div>
          <div>
            <label className="block text-gray-400">Price per piece (₹)</label>
            <input
              type="number"
              value={zipperPrice}
              onChange={(e) => setZipperPrice(parseFloat(e.target.value))}
              className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            />
          </div>
        </div>
      </div>

      {/* Threads */}
      <div>
        <h3 className="text-xl font-semibold text-cyan-400 mb-2">Thread</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-gray-400">Quantity</label>
            <input
              type="number"
              value={threadsQty}
              onChange={(e) => setThreadsQty(parseFloat(e.target.value))}
              className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            />
          </div>
          <div>
            <label className="block text-gray-400">Price per spool (₹)</label>
            <input
              type="number"
              value={threadPrice}
              onChange={(e) => setThreadPrice(parseFloat(e.target.value))}
              className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            />
          </div>
        </div>
      </div>

      <div className="mt-4 text-cyan-400 font-semibold text-lg">
        Total Accessory Cost: ₹{isNaN(totalAccessoryCost.toFixed(2))?0:totalAccessoryCost.toFixed(2)}
      </div>
    </div>
  );
}
