import React, { useState, useMemo } from 'react';

// BOM Calculator - Single-file React component
// Tailwind CSS classes are used for styling.
// Default export a React component so it can be previewed.

export default function BOMCalculator() {
  // Fabric inputs
  const [productName, setProductName] = useState('Sample Product');
  const [quantity, setQuantity] = useState(100);
  const [fabricPricePerMeter, setFabricPricePerMeter] = useState(150); // INR per meter
  const [lengthPerUnit, setLengthPerUnit] = useState(1.2); // meters required per unit
  const [wastagePercent, setWastagePercent] = useState(5);
  const [fabricWidthCm, setFabricWidthCm] = useState(140);

  // Accessories rows
  const [accessories, setAccessories] = useState([
    { id: 1, name: 'Zipper', qtyPerUnit: 1, unitCost: 20 },
    { id: 2, name: 'Thread (roll)', qtyPerUnit: 0.1, unitCost: 30 },
  ]);

  // Misc: trimming, labels etc
  const [otherCostPerUnit, setOtherCostPerUnit] = useState(5);

  // Add / remove accessory
  const addAccessory = () => {
    setAccessories((s) => [
      ...s,
      { id: Date.now(), name: 'New accessory', qtyPerUnit: 0, unitCost: 0 },
    ]);
  };
  const updateAccessory = (id, field, value) => {
    setAccessories((s) => s.map(a => a.id === id ? { ...a, [field]: value } : a));
  };
  const removeAccessory = (id) => setAccessories((s) => s.filter(a => a.id !== id));

  // Calculations
  const fabricMetersRequired = useMemo(() => {
    const base = Number(lengthPerUnit) * Number(quantity);
    const withWastage = base * (1 + Number(wastagePercent) / 100);
    return Number.isFinite(withWastage) ? withWastage : 0;
  }, [lengthPerUnit, quantity, wastagePercent]);

  const fabricCost = useMemo(() => {
    return fabricMetersRequired * Number(fabricPricePerMeter);
  }, [fabricMetersRequired, fabricPricePerMeter]);

  const accessoriesCost = useMemo(() => {
    return accessories.reduce((sum, a) => {
      const perUnit = Number(a.qtyPerUnit) || 0;
      const unitCost = Number(a.unitCost) || 0;
      return sum + perUnit * unitCost * Number(quantity);
    }, 0);
  }, [accessories, quantity]);

  const otherCostTotal = Number(otherCostPerUnit) * Number(quantity);

  const subtotal = fabricCost + accessoriesCost + otherCostTotal;

  // +/- 5% estimate range
  const lowEstimate = subtotal * 0.95;
  const highEstimate = subtotal * 1.05;

  // Per-unit breakdown
  const perUnit = useMemo(() => {
    const perUnitFabric = (Number(lengthPerUnit) * (1 + Number(wastagePercent) / 100));
    const perUnitFabricCost = perUnitFabric * Number(fabricPricePerMeter);
    const perUnitAccessories = accessories.reduce((sum, a) => {
      return sum + (Number(a.qtyPerUnit) || 0) * (Number(a.unitCost) || 0);
    }, 0);
    const perUnitOther = Number(otherCostPerUnit) || 0;
    const totalPerUnit = perUnitFabricCost + perUnitAccessories + perUnitOther;
    return {
      perUnitFabric,
      perUnitFabricCost,
      perUnitAccessories,
      perUnitOther,
      totalPerUnit,
    };
  }, [lengthPerUnit, wastagePercent, fabricPricePerMeter, accessories, otherCostPerUnit]);

  // Export CSV
  const exportCSV = () => {
    const headers = ['Item', 'Description', 'Qty', 'Unit', 'Unit Cost', 'Total Cost'];
    const rows = [];

    rows.push(['Fabric', `${fabricWidthCm} cm wide`, fabricMetersRequired.toFixed(3), 'm', fabricPricePerMeter.toFixed(2), fabricCost.toFixed(2)]);

    accessories.forEach(a => {
      const total = (Number(a.qtyPerUnit) || 0) * (Number(a.unitCost) || 0) * Number(quantity);
      rows.push([a.name, `Per unit: ${a.qtyPerUnit}`, quantity, 'pcs', a.unitCost, total.toFixed(2)]);
    });

    rows.push(['Other', 'Misc per unit', quantity, 'pcs', otherCostPerUnit.toFixed(2), otherCostTotal.toFixed(2)]);
    rows.push(['', '', '', '', 'SUBTOTAL', subtotal.toFixed(2)]);
    rows.push(['', '', '', '', 'LOW (-5%)', lowEstimate.toFixed(2)]);
    rows.push(['', '', '', '', 'HIGH (+5%)', highEstimate.toFixed(2)]);

    const csvContent = [headers.join(','), ...rows.map(r => r.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${productName.replace(/\s+/g,'_')}_BOM.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Print-friendly BOM: open a new window with printable HTML
  const printBOM = () => {
    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write(`<html><head><title>BOM - ${productName}</title><style>body{font-family:Arial,Helvetica,sans-serif;padding:1rem}table{width:100%;border-collapse:collapse}td,th{border:1px solid #444;padding:6px;text-align:left}</style></head><body>`);
    win.document.write(`<h2>BOM - ${productName}</h2>`);
    win.document.write(`<p>Quantity: ${quantity}</p>`);
    win.document.write(`<table><thead><tr><th>Item</th><th>Description</th><th>Qty</th><th>Unit</th><th>Unit Cost</th><th>Total Cost</th></tr></thead><tbody>`);
    win.document.write(`<tr><td>Fabric</td><td>${fabricWidthCm} cm width</td><td>${fabricMetersRequired.toFixed(3)}</td><td>m</td><td>${Number(fabricPricePerMeter).toFixed(2)}</td><td>${fabricCost.toFixed(2)}</td></tr>`);
    accessories.forEach(a => {
      const total = (Number(a.qtyPerUnit) || 0) * (Number(a.unitCost) || 0) * Number(quantity);
      win.document.write(`<tr><td>${a.name}</td><td>Per unit: ${a.qtyPerUnit}</td><td>${quantity}</td><td>pcs</td><td>${Number(a.unitCost).toFixed(2)}</td><td>${total.toFixed(2)}</td></tr>`);
    });
    win.document.write(`<tr><td>Other</td><td>Misc per unit</td><td>${quantity}</td><td>pcs</td><td>${Number(otherCostPerUnit).toFixed(2)}</td><td>${otherCostTotal.toFixed(2)}</td></tr>`);
    win.document.write(`</tbody></table>`);
    win.document.write(`<h3>Subtotal: ${subtotal.toFixed(2)}</h3><p>Estimate Range: ${lowEstimate.toFixed(2)} — ${highEstimate.toFixed(2)} (±5%)</p>`);
    win.document.write('</body></html>');
    win.document.close();
    win.print();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Textile BOM Calculator (Frontend)</h1>
        <p className="text-sm text-gray-600">Designed for fabric converters: bag makers, seat covers, sofa covers, curtains, etc. Produces a BOM with ±5% estimate.</p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <section className="col-span-1 md:col-span-2 bg-white p-6 rounded shadow">
          <h2 className="font-semibold mb-4">Product & Fabric</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <label className="flex flex-col">
              <span className="text-xs text-gray-600">Product name</span>
              <input className="border rounded px-2 py-1" value={productName} onChange={e=>setProductName(e.target.value)} />
            </label>

            <label className="flex flex-col">
              <span className="text-xs text-gray-600">Quantity</span>
              <input type="number" min={1} className="border rounded px-2 py-1" value={quantity} onChange={e=>setQuantity(Number(e.target.value))} />
            </label>

            <label className="flex flex-col">
              <span className="text-xs text-gray-600">Fabric width (cm)</span>
              <input type="number" min={30} className="border rounded px-2 py-1" value={fabricWidthCm} onChange={e=>setFabricWidthCm(Number(e.target.value))} />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
            <label className="flex flex-col">
              <span className="text-xs text-gray-600">Length required per unit (m)</span>
              <input type="number" step="0.01" className="border rounded px-2 py-1" value={lengthPerUnit} onChange={e=>setLengthPerUnit(Number(e.target.value))} />
            </label>

            <label className="flex flex-col">
              <span className="text-xs text-gray-600">Wastage / Allowance (%)</span>
              <input type="number" step="0.1" className="border rounded px-2 py-1" value={wastagePercent} onChange={e=>setWastagePercent(Number(e.target.value))} />
            </label>

            <label className="flex flex-col">
              <span className="text-xs text-gray-600">Fabric price per metre (INR)</span>
              <input type="number" step="0.01" className="border rounded px-2 py-1" value={fabricPricePerMeter} onChange={e=>setFabricPricePerMeter(Number(e.target.value))} />
            </label>
          </div>

          <div className="mt-6">
            <h3 className="font-medium">Accessories</h3>
            <div className="space-y-3 mt-3">
              {accessories.map((a) => (
                <div key={a.id} className="grid grid-cols-12 gap-2 items-center">
                  <input className="col-span-5 border rounded px-2 py-1" value={a.name} onChange={e=>updateAccessory(a.id,'name',e.target.value)} />
                  <input type="number" step="0.01" className="col-span-2 border rounded px-2 py-1" value={a.qtyPerUnit} onChange={e=>updateAccessory(a.id,'qtyPerUnit',e.target.value)} />
                  <span className="col-span-1 text-xs text-gray-500">/unit</span>
                  <input type="number" step="0.01" className="col-span-2 border rounded px-2 py-1" value={a.unitCost} onChange={e=>updateAccessory(a.id,'unitCost',e.target.value)} />
                  <button className="col-span-2 bg-red-500 text-white px-2 py-1 rounded" onClick={()=>removeAccessory(a.id)}>Remove</button>
                </div>
              ))}
            </div>
            <div className="mt-3">
              <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={addAccessory}>+ Add accessory</button>
            </div>

            <div className="mt-4">
              <label className="flex items-center gap-3">
                <span className="text-xs text-gray-600">Other cost per unit (labels, trimming)</span>
                <input type="number" step="0.01" className="ml-2 border rounded px-2 py-1" value={otherCostPerUnit} onChange={e=>setOtherCostPerUnit(Number(e.target.value))} />
              </label>
            </div>
          </div>
        </section>

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

            <div className="mt-4 space-y-2">
              <button onClick={exportCSV} className="w-full bg-green-600 text-white py-2 rounded">Export CSV</button>
              <button onClick={printBOM} className="w-full bg-gray-800 text-white py-2 rounded">Print BOM</button>
            </div>
          </div>

          <div className="mt-6 text-xs text-gray-500">
            <strong>Per unit:</strong>
            <div>Fabric (incl. wastage): {perUnit.perUnitFabric.toFixed(3)} m</div>
            <div>Cost per unit: ₹ {perUnit.totalPerUnit.toFixed(2)}</div>
          </div>
        </aside>
      </main>

      <section className="mt-6 bg-white p-6 rounded shadow">
        <h2 className="font-semibold mb-4">Generated BOM (Preview)</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left border-b"><th className="py-2">Item</th><th className="py-2">Description</th><th className="py-2">Qty</th><th className="py-2">Unit</th><th className="py-2">Unit Cost</th><th className="py-2">Total</th></tr>
            </thead>
            <tbody>
              <tr className="border-b"><td className="py-2">Fabric</td><td>{fabricWidthCm} cm width</td><td>{fabricMetersRequired.toFixed(3)}</td><td>m</td><td>₹ {Number(fabricPricePerMeter).toFixed(2)}</td><td>₹ {fabricCost.toFixed(2)}</td></tr>
              {accessories.map(a => {
                const total = (Number(a.qtyPerUnit) || 0) * (Number(a.unitCost) || 0) * Number(quantity);
                return (
                  <tr key={a.id} className="border-b"><td className="py-2">{a.name}</td><td>Per unit: {a.qtyPerUnit}</td><td>{quantity}</td><td>pcs</td><td>₹ {Number(a.unitCost).toFixed(2)}</td><td>₹ {total.toFixed(2)}</td></tr>
                );
              })}
              <tr className="border-b"><td className="py-2">Other</td><td>Misc per unit</td><td>{quantity}</td><td>pcs</td><td>₹ {Number(otherCostPerUnit).toFixed(2)}</td><td>₹ {otherCostTotal.toFixed(2)}</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <footer className="mt-6 text-xs text-gray-500 text-center">Estimate tolerance: ±5% (This calculator uses a simple allowance method — for cutting layouts/marker efficiency please integrate pattern/marker planning data for improved accuracy.)</footer>
    </div>
  );
}
