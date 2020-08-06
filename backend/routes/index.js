const router = require("express").Router();
const Resume = require("../models/Resume.model");
const User = require("../models/User");
const NewJobs = require("../models/NewJobs");
const uploadCloud = require("../config/cloudinary-setup");

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
    res.status(200).json(helpers);
  });
});
router.get("/job-helpers/user", (req, res) => {
  User.find().then(helpers => {
    console.log("Hello");
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
    res.json(result[0]);
  });
});

router.post(
  "/post-rewards/:id",
  uploadCloud.single("image"),
  (req, res, next) => {
    console.log(req.params, req.file);
    User.findByIdAndUpdate(
      req.params.id,
      { image: req.file.path },
      { new: true }
    ).then(result => {
      res.json(result);
    });
  }
);

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

router.post("/add_Education/:id", (req, res, next) => {
  Resume.findById(req.params.id).then(result => {
    console.log(req.body);
    result.education.unshift(req.body);
    result.save((err, doc) => {
      if (err) throw err;
      res.json(doc);
    });
  });
});

router.get("/user_search/jobTitle/:id", (req, res, next) => {
  const found = [];
  let searches = req.params.id.split("+");
  searches.forEach((elem, ind) => {
    const searchExp = new RegExp(`.*${searches[ind]}.*`, "ig");
    User.find({ jobTitle: { $regex: searchExp } })
      .then(res => {
        res.forEach(elem => found.push(elem));
      })
      .then(() => {
        // User.find({ jobTitle: { $regex: searchExp }) {$or: [{firstName: {$regex: searchExp}}, {lastName: {$regex: searchExp}}]}
        User.find({
          $or: [
            { firstName: { $regex: searchExp } },
            { lastName: { $regex: searchExp } }
          ]
        })
          .then(result => {
            result.forEach(elem => found.push(elem));
          })
          .then(() => res.json([...new Set(found)]));
      });
  });
});

router.post("/delete_WE/:id", (req, res, next) => {
  console.log(req.body.remove);
  console.log(req.params.id);
  Resume.findById(req.params.id).then(result => {
    result.workExperience.splice(req.body.remove, 1);
    result.save((err, doc) => {
      if (err) throw error;
      res.json(doc);
    });
  });
});

router.post("/delete_Skill/:id", (req, res, next) => {
  console.log(req.body.remove);
  console.log(req.params.id);
  Resume.findById(req.params.id).then(result => {
    result.skills.splice(req.body.remove, 1);
    result.save((err, doc) => {
      if (err) throw error;
      res.json(doc);
    });
  });
});

router.post("/delete_Edu/:id", (req, res, next) => {
  console.log(req.body.remove);
  console.log(req.params.id);
  Resume.findById(req.params.id).then(result => {
    result.education.splice(req.body.remove, 1);
    result.save((err, doc) => {
      if (err) throw error;
      console.log(doc);
      res.json(doc);
    });
  });
});

router.post('/connect', (req, res, next) => {
  // console.log(req.body.idArr[0])
  User.findById(req.body.idArr[0]).then(result => {
    // console.log(result)
    if (!result.connections.includes(req.body.idArr[1])) {
      result.connections.push(req.body.idArr[1])
      result.save((err, doc) => {
        if (err) throw error;
        res.json(doc)
      })
    }
    else {
      res.json(result)
    }
  })
})

router.get('/get-connections/:id', (req,res,next) => {
  User.findById(req.params.id).populate('connections').then(result => {
    res.json(result)
  })
})

module.exports = router;
