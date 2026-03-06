import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./routes/authroutes.js";
import userRoutes from "./routes/userroutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/kinder")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(5000, () => console.log("Server running on port 5000"));
