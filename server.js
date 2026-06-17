import "dotenv/config";
import express from "express";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import jobRouter from "./routes/v1/jobs.js";
import expenseRouter from "./routes/v1/expenseTracker.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

connectDB();

app.use("/api/v1", jobRouter);
app.use("/api/v1", expenseRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
