import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bomRoutes from "./routes/bomRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/bom", bomRoutes);

app.get("/", (req, res) => {
  res.send("Textile BOM Calculator API running...");
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
