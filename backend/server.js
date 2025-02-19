import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import path from "path";

const app = express();
const port = process.env.PORT || 3000;


dotenv.config();

const __dirname = path.resolve();

// Enable CORS before using any routes
app.use(cors({
  origin: "http://localhost:5173",  // Only allow this frontend to access the API
}));

app.use(express.json()); // Allow us to accept JSON data in the body

// When we visit /api/products, it will be prefixed when we call POST, GET, PUT, DELETE HTTP calls
app.use("/api/products", productRoutes);


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}
app.listen(port, () => { 
  connectDB();
  console.log(`${port} is up and flying`);
});
