import React from "react";

export default function AccessoriesSection({ accessories, setAccessories, otherCostPerUnit, setOtherCostPerUnit }) {
  const addAccessory = () =>
    setAccessories(s => [...s, { id: Date.now(), name: "New accessory", qtyPerUnit: 0, unitCost: 0 }]);

  const updateAccessory = (id, field, value) =>
    setAccessories(s => s.map(a => (a.id === id ? { ...a, [field]: value } : a)));

  const removeAccessory = id =>
    setAccessories(s => s.filter(a => a.id !== id));

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="font-semibold mb-4">Accessories</h2>

      {accessories.map(a => (
        <div key={a.id} className="grid grid-cols-12 gap-2 items-center mb-2">
          <input className="col-span-5 border rounded px-2 py-1" value={a.name} onChange={e => updateAccessory(a.id, "name", e.target.value)} />
          <input type="number" step="0.01" className="col-span-2 border rounded px-2 py-1" value={a.qtyPerUnit} onChange={e => updateAccessory(a.id, "qtyPerUnit", e.target.value)} />
          <span className="col-span-1 text-xs text-gray-500">/unit</span>
          <input type="number" step="0.01" className="col-span-2 border rounded px-2 py-1" value={a.unitCost} onChange={e => updateAccessory(a.id, "unitCost", e.target.value)} />
          <button className="col-span-2 bg-red-500 text-white px-2 py-1 rounded" onClick={() => removeAccessory(a.id)}>Remove</button>
        </div>
      ))}

      <button className="mt-2 px-3 py-1 bg-blue-600 text-white rounded" onClick={addAccessory}>+ Add accessory</button>

      <div className="mt-4">
        <label className="flex items-center gap-3">
          <span className="text-xs text-gray-600">Other cost per unit</span>
          <input type="number" step="0.01" className="border rounded px-2 py-1" value={otherCostPerUnit} onChange={e => setOtherCostPerUnit(Number(e.target.value))} />
        </label>
      </div>
    </div>
  );
}
