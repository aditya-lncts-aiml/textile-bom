import React from "react";

export default function FabricSection({
  productName, setProductName,
  quantity, setQuantity,
  fabricWidthCm, setFabricWidthCm,
  fabricPricePerMeter, setFabricPricePerMeter,
  lengthPerUnit, setLengthPerUnit,
  wastagePercent, setWastagePercent
}) {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="font-semibold mb-4">Product & Fabric</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <label className="flex flex-col">
          <span className="text-xs text-gray-600">Product name</span>
          <input className="border rounded px-2 py-1" value={productName} onChange={e => setProductName(e.target.value)} />
        </label>

        <label className="flex flex-col">
          <span className="text-xs text-gray-600">Quantity</span>
          <input type="number" min={1} className="border rounded px-2 py-1" value={quantity} onChange={e => setQuantity(Number(e.target.value))} />
        </label>

        <label className="flex flex-col">
          <span className="text-xs text-gray-600">Fabric width (cm)</span>
          <input type="number" min={30} className="border rounded px-2 py-1" value={fabricWidthCm} onChange={e => setFabricWidthCm(Number(e.target.value))} />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
        <label className="flex flex-col">
          <span className="text-xs text-gray-600">Length per unit (m)</span>
          <input type="number" step="0.01" className="border rounded px-2 py-1" value={lengthPerUnit} onChange={e => setLengthPerUnit(Number(e.target.value))} />
        </label>

        <label className="flex flex-col">
          <span className="text-xs text-gray-600">Wastage (%)</span>
          <input type="number" step="0.1" className="border rounded px-2 py-1" value={wastagePercent} onChange={e => setWastagePercent(Number(e.target.value))} />
        </label>

        <label className="flex flex-col">
          <span className="text-xs text-gray-600">Fabric price (INR/m)</span>
          <input type="number" step="0.01" className="border rounded px-2 py-1" value={fabricPricePerMeter} onChange={e => setFabricPricePerMeter(Number(e.target.value))} />
        </label>
      </div>
    </div>
  );
}
