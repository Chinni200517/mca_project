import "dotenv/config";
import express from "express"
import cors from 'cors'
import { connectDB } from "./config/db.js"
import userRouter from "./routes/userRoute.js"
import foodRouter from "./routes/foodRoute.js"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
import dotenv from 'dotenv'
import { resetAndSeedData } from "./seedData.js"

dotenv.config()

// app config
const app = express()
const port = process.env.PORT || 4000;

// middlewares
app.use(express.json())
app.use(cors())

const initializeApp = async () => {
  try {
    await connectDB();
    if (process.env.SEED_DB !== "false") {
      await resetAndSeedData();
      console.log("✅ Fresh food data loaded into the database");
    }
  } catch (error) {
    console.error("Database initialization failed:", error.message)
  }
}

initializeApp()

// api endpoints
app.use("/api/user", userRouter)
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

app.post("/api/admin/reset", async (req, res) => {
  try {
    await resetAndSeedData();
    res.json({ success: true, message: "Database reset and seeded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Reset failed" });
  }
})

app.get("/", (req, res) => {
  res.send("API Working")
});

app.listen(port, () => console.log(`Server started on http://localhost:${port}`))