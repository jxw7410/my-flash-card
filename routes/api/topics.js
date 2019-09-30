const express = require('express');
const router = express.Router();
const passport = require('passport');
const { Topic } = require('../../models/sequelize');

const { errorsParser } = require('../../utils/helper_methods');

router.get('/', passport.authenticate('jwt', {session: false }), async (req, res)=>{
  // We don't have to find User because user has been found through passport authentication,
  // And has been escapsulated in req due to the pass.auth middleware.
  const topics = await Topic.findAll({
    where:{
      userId: req.user.id
    }
  });

  if (topics.length) {
    res.json(topics)
  } else {
    res.status(404).json({Topics: 'No Topics where found for current User'})
  }

});

router.post('/new', passport.authenticate('jwt', {session: false }), async (req, res) => {
  const newTopic = new Topic({
    name: req.body.name,
    type: req.body.type,
    userId: req.user.id
  });


  try {
    await newTopic.save();
    res.json(newTopic)
  } catch (ValidationError) {
    res.status(422).json(errorsParser(Validation.errors));
  }
});

module.exports = router;
