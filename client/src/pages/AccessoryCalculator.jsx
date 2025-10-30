import { useState } from "react";

export default function AccessoryCalculator({ onAccessoryChange }) {
  const [accessories, setAccessories] = useState([
    { name: "Zipper", quantity: 0, unitPrice: 0 },
    { name: "Button", quantity: 0, unitPrice: 0 },
    { name: "Thread", quantity: 0, unitPrice: 0 },
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...accessories];
    updated[index][field] = value;
    setAccessories(updated);
    const total = updated.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0
    );
    onAccessoryChange(total);
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-2xl mt-8">
      {accessories.map((item, i) => (
        <div key={i} className="mb-4">
          <p className="font-medium">{item.name}</p>
          <input
            type="number"
            placeholder="Quantity"
            className="input"
            onChange={(e) =>
              handleChange(i, "quantity", parseFloat(e.target.value) || 0)
            }
          />
          <input
            type="number"
            placeholder="Unit Price (₹)"
            className="input"
            onChange={(e) =>
              handleChange(i, "unitPrice", parseFloat(e.target.value) || 0)
            }
          />
        </div>
      ))}
    </div>
  );
}
