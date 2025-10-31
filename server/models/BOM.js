import mongoose from "mongoose";

const accessorySchema = new mongoose.Schema({
  name: String,
  qtyPerUnit: Number,
  unitCost: Number,
});

const bomSchema = new mongoose.Schema({
  productName: String,
  quantity: Number,
  fabricPricePerMeter: Number,
  lengthPerUnit: Number,
  wastagePercent: Number,
  fabricWidthCm: Number,
  otherCostPerUnit: Number,
  accessories: [accessorySchema],
  subtotal: Number,
  date: { type: Date, default: Date.now },
});

export default mongoose.model("BOM", bomSchema);
