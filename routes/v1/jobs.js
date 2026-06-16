import express from "express";

const router = express.Router();

const jobs = [
  { id: 1, company: "NCDMB", dateApplied: "2/05/2026", status: "pending" },
];

router
  .route("/jobs")
  .get((req, res) => {
    res
      .status(200)
      .json({ message: "successfully got posted jobs", data: jobs });
  })
  .post((req, res) => {
    const newJob = {
      id: jobs.length + 1,
      company: req.body.company,
      dateApplied: new Date(),
      status: req.body.status,
    };
    jobs.push(newJob);
    res
      .status(201)
      .json({ message: "successfully posted a new job", data: jobs });
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
      message: `Job with this ID$ {jobId} is avalaible`,
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
