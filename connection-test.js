import "dotenv/config";
import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MONGODB_URI not set in .env");
  process.exit(1);
}

async function run() {
  console.log("Attempting mongoose connect (10s timeout)...");
  try {
    const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
    console.log("Connected to", conn.connection.host);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("Connection failed:");
    console.error(err);
    process.exit(1);
  }
}

run();
