import { useState } from "react";

export default function FabricCalculator() {
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [costPerMeter, setCostPerMeter] = useState(0);
  const [result, setResult] = useState(null);

  const calculate = () => {
    const totalMeters = (length * width) / 10000;
    const totalCost = totalMeters * costPerMeter;
    const estimateMin = totalCost * 0.95;
    const estimateMax = totalCost * 1.05;
    setResult({ totalCost, estimateMin, estimateMax });
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-2xl mt-8">
      <input type="number" placeholder="Length (cm)" className="input"
        onChange={e => setLength(e.target.value)} />
      <input type="number" placeholder="Width (cm)" className="input"
        onChange={e => setWidth(e.target.value)} />
      <input type="number" placeholder="Cost per meter" className="input"
        onChange={e => setCostPerMeter(e.target.value)} />
      <button onClick={calculate} className="bg-blue-500 text-white px-4 py-2 mt-3 rounded-lg">
        Calculate
      </button>
      {result && (
        <div className="mt-4">
          <p>Total Cost: ₹{result.totalCost.toFixed(2)}</p>
          <p>Estimated Range: ₹{result.estimateMin.toFixed(2)} - ₹{result.estimateMax.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}
