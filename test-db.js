import "dotenv/config";
import mongoose from "mongoose";

const testConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("Test: connected to MongoDB:", conn.connection.host);
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Test: connection error:", error.message);
    process.exit(1);
  }
};

testConnect();
