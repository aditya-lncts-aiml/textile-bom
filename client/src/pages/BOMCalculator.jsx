import React, { useState, useMemo, useRef } from "react";
import FabricSection from "./FabricSection";
import AccessoriesSection from "./AccessoriesSection";
import SummarySection from "./SummarySection";
import BOMPreview from "./BOMPreview";
import { calculateFabricMeters, calculateSubtotal } from "./utils";
import axios from "axios";

export default function BOMCalculator() {
  const [productName, setProductName] = useState("Sample Product");
  const [quantity, setQuantity] = useState(100);
  const [fabricPricePerMeter, setFabricPricePerMeter] = useState(150);
  const [lengthPerUnit, setLengthPerUnit] = useState(1.2);
  const [wastagePercent, setWastagePercent] = useState(5);
  const [fabricWidthCm, setFabricWidthCm] = useState(140);
  const [otherCostPerUnit, setOtherCostPerUnit] = useState(5);

  const [accessories, setAccessories] = useState([
    { id: 1, name: "Zipper", qtyPerUnit: 1, unitCost: 20 },
    { id: 2, name: "Thread (roll)", qtyPerUnit: 0.1, unitCost: 30 },
  ]);

  const printRef = useRef(); // 🔹 Reference to BOMPreview section

  const fabricMetersRequired = useMemo(
    () => calculateFabricMeters(lengthPerUnit, quantity, wastagePercent),
    [lengthPerUnit, quantity, wastagePercent]
  );

  const {
    fabricCost,
    accessoriesCost,
    otherCostTotal,
    subtotal,
    lowEstimate,
    highEstimate,
    perUnit,
  } = useMemo(
    () =>
      calculateSubtotal({
        fabricMetersRequired,
        fabricPricePerMeter,
        accessories,
        quantity,
        otherCostPerUnit,
        lengthPerUnit,
        wastagePercent,
      }),
    [
      fabricMetersRequired,
      fabricPricePerMeter,
      accessories,
      quantity,
      otherCostPerUnit,
      lengthPerUnit,
      wastagePercent,
    ]
  );

  // 🔹 Save to DB
  const handleSaveBOM = async () => {
    const bomData = {
      productName,
      quantity,
      fabricPricePerMeter,
      lengthPerUnit,
      wastagePercent,
      fabricWidthCm,
      otherCostPerUnit,
      accessories,
      subtotal,
    };

    try {
      const res = await axios.post("http://localhost:5000/api/bom", bomData);
      alert("BOM saved successfully!");
      console.log(res.data);
    } catch (error) {
      console.error("Error saving BOM:", error);
      alert("Error saving BOM. Check console for details.");
    }
  };

  // 🔹 Print only BOMPreview section
  const handlePrint = () => {
    const printContent = printRef.current.innerHTML;
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>BOM Preview - ${productName}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2 { text-align: center; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f3f3f3; }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Textile BOM Calculator</h1>
        <p className="text-sm text-gray-600">
          Fabric & accessories estimation with ±5% tolerance.
        </p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <section className="col-span-1 md:col-span-2 space-y-6">
          <FabricSection
            productName={productName}
            setProductName={setProductName}
            quantity={quantity}
            setQuantity={setQuantity}
            fabricWidthCm={fabricWidthCm}
            setFabricWidthCm={setFabricWidthCm}
            fabricPricePerMeter={fabricPricePerMeter}
            setFabricPricePerMeter={setFabricPricePerMeter}
            lengthPerUnit={lengthPerUnit}
            setLengthPerUnit={setLengthPerUnit}
            wastagePercent={wastagePercent}
            setWastagePercent={setWastagePercent}
          />

          <AccessoriesSection
            accessories={accessories}
            setAccessories={setAccessories}
            otherCostPerUnit={otherCostPerUnit}
            setOtherCostPerUnit={setOtherCostPerUnit}
          />
        </section>

        <SummarySection
          productName={productName}
          quantity={quantity}
          fabricWidthCm={fabricWidthCm}
          fabricMetersRequired={fabricMetersRequired}
          fabricCost={fabricCost}
          accessoriesCost={accessoriesCost}
          otherCostTotal={otherCostTotal}
          subtotal={subtotal}
          lowEstimate={lowEstimate}
          highEstimate={highEstimate}
          perUnit={perUnit}
          accessories={accessories}
          otherCostPerUnit={otherCostPerUnit}
        />
      </main>

      {/* 🔹 This is the section to print */}
      <div ref={printRef}>
        <BOMPreview
          accessories={accessories}
          quantity={quantity}
          fabricWidthCm={fabricWidthCm}
          fabricMetersRequired={fabricMetersRequired}
          fabricPricePerMeter={fabricPricePerMeter}
          fabricCost={fabricCost}
          otherCostPerUnit={otherCostPerUnit}
          otherCostTotal={otherCostTotal}
        />
      </div>

      {/* 🔹 Action buttons */}
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          onClick={handleSaveBOM}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          💾 Save Bill of Material
        </button>

        <button
          onClick={handlePrint}
          className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
        >
          🖨️ Print BOM Preview
        </button>
      </div>

      <footer className="mt-6 text-xs text-gray-500 text-center">
        Estimate tolerance: ±5%. Integrate marker planning for higher accuracy.
      </footer>
    </div>
  );
}
