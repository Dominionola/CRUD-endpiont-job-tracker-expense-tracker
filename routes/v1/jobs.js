import express from "express";
import Job from "../../models/Jobs.js";

const router = express.Router();

router.route("/jobs").get(async (req, res) => {
  try {
    const jobs = await Job.find();
    return res.status(200).json({ message: "successfully got posted jobs", data: jobs });
  } catch (error) {
    return res.status(500).json({ message: "server error", error: error.message });
  }
});

router.route("/jobs").post(async (req, res) => {
  try {
    const job = await Job.create({ company: req.body.company, status: req.body.status });
    return res.status(201).json({ message: "successfully posted a new job", data: job });
  } catch (error) {
    return res.status(400).json({ message: "could not create job", error: error.message });
  }
});

router
  .route("/jobs/:id")
  .get((req, res) => {
    const jobId = parseInt(req.params.id, 10);
    const foundId = jobs.find((job) => job.id === jobId);

    if (!foundId) {
      res.status(404).json({ message: "no job with this ID" });
      return;
    }

    res.status(200).json({
      message: `Job with this ID ${jobId} is avalaible`,
      data: foundId,
    });
  })
  .put((req, res) => {
    const jobId = parseInt(req.params.id, 10);
    const foundJob = jobs.find((job) => job.id === jobId);

    if (!foundJob) {
      res.status(404).json({ message: "no hob with this ID" });
      return;
    }

    foundJob.company = req.body.company;
    foundJob.status = req.body.status;

    res.status(201).json({
      message: "Job has been updated sucessfully",
      data: foundJob,
      success: true,
    });
  })
  .delete((req, res) => {
    const jobId = parseInt(req.params.id, 10);
    const foundIndex = jobs.findIndex((job) => job.id === jobId);

    if (!foundJob) {
      res.status(404).json({ message: "no hob with this ID" });
      return;
    }

    const deletedJob = jobs.splice(foundIndex, 1)[0];
    res.status(200).json({
      success: true,
      message: "Job deleted succefully",
      data: deletedJob,
    });
  });

export default router;
