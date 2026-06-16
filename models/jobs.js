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
      required: [true, "what is the status"],
    },
  },

  {
    timestamps: true,
  },
);
