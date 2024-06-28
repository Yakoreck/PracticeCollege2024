// src/server.ts
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { connectDB } from "./config/db";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import commentRoutes from "./routes/commentRoutes";
import orderRoutes from "./routes/orderRoutes";
import cors from "cors";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${PORT}`);
});
