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
router.get("/job-helpers", (req, res) => {
  NewJobs.find().then(helpers => {
    res.json(helpers);
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
router.get("/get-resume/:id", (req, res, next) => {
  console.log(req.params);
  Resume.find({ userId: req.params.id }).then(result => {
    res.json(result);
  });
});

router.post("/add_WE/:id", (req, res, next) => {
  Resume.findById(req.params.id).then(result => {
    console.log(result, "peach");
    result.workExperience.unshift(req.body);
    result.save((err, doc) => {
      console.log(err, doc, "apple");
      if (err) throw err;
      res.json(doc);
    });
  });
});

router.post("/add_Skill/:id", (req, res, next) => {
  Resume.findById(req.params.id).then(result => {
    console.log(req.body.newSkill);
    result.skills.unshift(req.body.newSkill);
    result.save((err, doc) => {
      if (err) throw err;
      res.json(doc);
    });
  });
});

router.post('/add_Education/:id', (req, res, next) => {
  Resume.findById(req.params.id).then(result => {
    console.log(req.body);
    result.education.unshift(req.body);
    result.save((err, doc) => {
      if (err) throw err;
      res.json(doc);
    });
  });
})

module.exports = router;
