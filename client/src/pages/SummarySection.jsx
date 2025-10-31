import React from "react";

export default function SummarySection({
  productName, quantity, fabricWidthCm, fabricMetersRequired,
  fabricCost, accessoriesCost, otherCostTotal, subtotal,
  lowEstimate, highEstimate, perUnit
}) {
  return (
    <aside className="bg-white p-6 rounded shadow">
      <h2 className="font-semibold mb-4">Summary</h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between"><span>Fabric required</span><strong>{fabricMetersRequired.toFixed(3)} m</strong></div>
        <div className="flex justify-between"><span>Fabric cost</span><strong>₹ {fabricCost.toFixed(2)}</strong></div>
        <div className="flex justify-between"><span>Accessories cost</span><strong>₹ {accessoriesCost.toFixed(2)}</strong></div>
        <div className="flex justify-between"><span>Other cost</span><strong>₹ {otherCostTotal.toFixed(2)}</strong></div>
        <hr />
        <div className="flex justify-between text-lg"><span>Subtotal</span><strong>₹ {subtotal.toFixed(2)}</strong></div>
        <div className="text-xs text-gray-600">Estimate range (±5%)</div>
        <div className="flex justify-between"><span>Low</span><strong>₹ {lowEstimate.toFixed(2)}</strong></div>
        <div className="flex justify-between"><span>High</span><strong>₹ {highEstimate.toFixed(2)}</strong></div>

        <div className="mt-4 text-xs text-gray-500">
          <strong>Per unit cost:</strong> ₹ {perUnit.totalPerUnit.toFixed(2)}
        </div>
      </div>
    </aside>
  );
}
