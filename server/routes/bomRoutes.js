import express from "express";
import BOM from "../models/BOM.js"; // You'll create this next
const router = express.Router();

// ✅ Save BOM data
router.post("/", async (req, res) => {
  try {
    const bom = new BOM(req.body);
    const saved = await bom.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Error saving BOM:", error);
    res.status(500).json({ message: "Error saving BOM", error });
  }
});

// ✅ Optional: get all BOMs
router.get("/", async (req, res) => {
  try {
    const all = await BOM.find();
    res.json(all);
  } catch (error) {
    res.status(500).json({ message: "Error fetching BOMs", error });
  }
});

export default router;
