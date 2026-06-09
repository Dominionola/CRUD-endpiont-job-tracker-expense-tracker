import express from "express";
import morgan from "morgan";
import jobRouter from "./routes/v1/jobs.js";
import expenseRouter from "./routes/v1/expenseTracker.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1", jobRouter);
app.use("/api/v1", expenseRouter);

app.listen(3000, () => {
  console.log("App is running in Port 3000");
});
