import express from "express";
import Job from "../../models/Jobs.js";

const router = express.Router();

// GET /api/v1/jobs
router.route("/jobs").get(async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    return res.status(200).json({ message: "successfully got posted jobs", data: jobs });
  } catch (error) {
    return res.status(500).json({ message: "server error", error: error.message });
  }
});

// POST /api/v1/jobs
router.route("/jobs").post(async (req, res) => {
  try {
    const job = await Job.create({ company: req.body.company, status: req.body.status });
    return res.status(201).json({ message: "successfully posted a new job", data: job });
  } catch (error) {
    return res.status(400).json({ message: "could not create job", error: error.message });
  }
});

// GET /api/v1/jobs/:id
router.route("/jobs/:id").get(async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "no job with this ID" });
    return res.status(200).json({ message: `Job with this ID ${req.params.id} is available`, data: job });
  } catch (error) {
    return res.status(400).json({ message: "invalid job id", error: error.message });
  }
});

// PUT /api/v1/jobs/:id
router.route("/jobs/:id").put(async (req, res) => {
  try {
    const updated = await Job.findByIdAndUpdate(
      req.params.id,
      { company: req.body.company, status: req.body.status },
      { new: true, runValidators: true },
    );

    if (!updated) return res.status(404).json({ message: "no job with this ID" });

    return res.status(200).json({ message: "Job has been updated successfully", data: updated, success: true });
  } catch (error) {
    return res.status(400).json({ message: "could not update job", error: error.message });
  }
});

// DELETE /api/v1/jobs/:id
router.route("/jobs/:id").delete(async (req, res) => {
  try {
    const deleted = await Job.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "no job with this ID" });
    return res.status(200).json({ success: true, message: "Job deleted successfully", data: deleted });
  } catch (error) {
    return res.status(400).json({ message: "invalid job id", error: error.message });
  }
});

export default router;

