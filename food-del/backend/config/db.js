import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/food-del");
    console.log("✅ DB Connected");
  } catch (error) {
    console.error("MongoDB Error:", error);
  }
};