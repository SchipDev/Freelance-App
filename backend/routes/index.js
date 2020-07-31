const router = require('express').Router();
const Resume = require('../models/Resume.model')
const User = require('../models/User')

router.get('/', (req, res, next) => {
  res.status(200).json({ msg: 'Working' });
});

router.get('/get-resume/:id', (req,res,next) => {
  console.log(req.params)
  Resume.find({'userId': req.params.id}).then(result => {
    console.log(result)
    res.json(result)})
})

module.exports = router;
