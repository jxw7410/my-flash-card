const express = require('express');
const router = express.Router();
const passport = require('passport');
const { Topic } = require('../../models/sequelize');

const { errorsParser } = require('../../utils/helper_methods');


const topicParser = topic => {
  return {
    [topic.id] : {
      name: topic.name,
      type: topic.type,
      description: topic.description
    }
  }
}

router.get('/', passport.authenticate('jwt', {session: false }), async (req, res)=>{
  // We don't have to find User because user has been found through passport authentication,
  // And has been escapsulated in req due to the pass.auth middleware.
  const topics = await Topic.findAll({
    where:{
      userId: req.user.id
    }
  });

  if (topics.length) {
    const parsedTopics = topics.map( topic => topicParser(topic.dataValues));
    res.json(Object.assign({}, ...parsedTopics))
  } else {
    res.status(404).json({Topics: 'No Topics where found for current User'})
  }

});

router.post('/new', passport.authenticate('jwt', {session: false }), async (req, res) => {
  const newTopic = new Topic({
    name: req.body.name,
    type: req.body.type,
    description: req.body.description,
    userId: req.user.id
  });


  try {
    await newTopic.save();
    res.json(topicParser(newTopic.dataValues))
  } catch (ValidationError) {
    res.status(422).json(errorsParser(Validation.errors));
  }
});

module.exports = router;
