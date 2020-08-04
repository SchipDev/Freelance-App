const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("../config/passport");
const Resume = require("../models/Resume.model");

router.post("/signup", (req, res, next) => {
  User.register(req.body, req.body.password)
    .then(user => {
      console.log("watermelon", user)
      req.login(user, function(err, result) {

        console.log('cantelope', err, results)
        res.status(201).json(user);

      });
    })
    .catch(err => {
      console.log(err, 'apple');
      res.status(500).json({ err });
    });
});

//return await service.get('/is-logged-in');
router.get("/is-logged-in", (req, res, next) => {
  console.log(req.user, 'orange')
  res.json(req.user);
});

router.post("/login", passport.authenticate("local"), (req, res, next) => {
  console.log(req.user, ' asparagus')
  const { user } = req;
  res.status(200).json(user);
});

router.get("/logout", (req, res, next) => {
  req.logout();
  res.status(200).json({ msg: "Logged out" });
});

router.get("/profile", isAuth, (req, res, next) => {
  User.findById(req.user._id)
    .then(user => res.status(200).json({ user }))
    .catch(err => res.status(500).json({ err }));
});

router.post("/post-resume", isAuth, (req, res, next) => {
  Resume.create(req.body).then(resume => {
    User.findByIdAndUpdate(req.user._id, { hasResume: true }, { new: true })
      .then(user => res.json({ user, resume }))
      .catch(error => res.json({ error }));
  });
});

function isAuth(req, res, next) {
  req.isAuthenticated()
    ? next()
    : res.status(401).json({ msg: "Log in first" });
}

module.exports = router;
