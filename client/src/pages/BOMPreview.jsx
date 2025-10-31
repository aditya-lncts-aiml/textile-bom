import React from "react";

export default function BOMPreview({
  accessories, quantity, fabricWidthCm,
  fabricMetersRequired, fabricPricePerMeter,
  fabricCost, otherCostPerUnit, otherCostTotal
}) {
  return (
    <section className="mt-6 bg-white p-6 rounded shadow">
      <h2 className="font-semibold mb-4">Generated BOM (Preview)</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">Item</th><th>Description</th><th>Qty</th><th>Unit</th><th>Unit Cost</th><th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td>Fabric</td><td>{fabricWidthCm} cm width</td><td>{fabricMetersRequired.toFixed(3)}</td><td>m</td><td>₹ {fabricPricePerMeter.toFixed(2)}</td><td>₹ {fabricCost.toFixed(2)}</td>
            </tr>
            {accessories.map(a => {
              const total = a.qtyPerUnit * a.unitCost * quantity;
              return (
                <tr key={a.id} className="border-b">
                  <td>{a.name}</td><td>Per unit: {a.qtyPerUnit}</td><td>{quantity}</td><td>pcs</td><td>₹ {a.unitCost.toFixed(2)}</td><td>₹ {total.toFixed(2)}</td>
                </tr>
              );
            })}
            <tr className="border-b">
              <td>Other</td><td>Misc per unit</td><td>{quantity}</td><td>pcs</td><td>₹ {otherCostPerUnit.toFixed(2)}</td><td>₹ {otherCostTotal.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
