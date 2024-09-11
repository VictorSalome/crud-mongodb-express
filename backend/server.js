import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "../backend/config/db.js";
import productRoutes from "../backend/router/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json()); // to accept json data

app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(5000, () => {
  connectDB();
  console.log("Serve started at http://localhost:" + PORT);
});
