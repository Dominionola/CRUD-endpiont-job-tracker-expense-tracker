import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "please add company email"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["applied", "interview", "offer"],
      default: "applied",
      required: [true, "what is the status"],
    },
  },

  {
    timestamps: true,
  },
);

const Job = mongoose.model("Job", jobSchema);
