import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "../backend/config/db.js";
import productRoutes from "../backend/router/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = "0.0.0.0";  // Alteração para escutar em 0.0.0.0

const __dirname = path.resolve();

app.use(express.json()); // para aceitar dados JSON

app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// Alterando para HOST e PORT
app.listen(PORT, HOST, () => {
  connectDB();
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
