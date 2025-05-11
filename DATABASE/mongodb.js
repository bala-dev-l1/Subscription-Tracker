import mongoose from "mongoose";
import { MONGODB_URl, NODE_ENV } from "../config/env.js";

// Throw error if the MongoDB URL is missing
if (!MONGODB_URl) {
  throw new Error("Please define the MONGODB_URl inside .env.<development/production>.local");
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URl);
    console.log(`✅ Connected to database in ${NODE_ENV} mode`);
  } catch (error) {
    console.error("❌ Error connecting to the database:", error);
    process.exit(1);
  }
};

export default connectToDatabase;
