const router = require("express").Router();
const Resume = require("../models/Resume.model");
const User = require("../models/User");
const NewJobs = require("../models/NewJobs");

router.get("/", (req, res, next) => {
  res.status(200).json({ msg: "Working" });
});

router.get("/get-resume/:id", (req, res, next) => {
  console.log(req.params);
  Resume.find({ userId: req.params.id }).then(result => {
    console.log(result);
    res.json(result);
  });
});
router.get("/post-job/:id", (req, res, next) => {
  console.log(req.params);
  NewJobs.find({ userId: req.params.id }).then(jobs => {
    res.json(jobs);
    console.log(result);
  });
});
router.get("/post-job/delete/:id", (req, res, next) => {
  console.log(req.params);
  NewJobs.deleteOne({ userId: req.params.id }).then(jobs => {
    res.json(jobs);
    console.log(result);
  });
});
router.post("/post-job", (req, res, next) => {
  NewJobs.create(req.body).then(newJob => {
    res.json("Your job has been successfully posted!");
  });
});

module.exports = router;
