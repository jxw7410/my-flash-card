const express = require('express');
const router = express.Router();
const passport = require('passport');
const { Topic } = require('../../models/sequelize');

const { errorsParser } = require('../../utils/helper_methods');


router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  // We don't have to find User because user has been found through passport authentication,
  // And has been escapsulated in req due to the pass.auth middleware.
  const topics = await Topic.findAll({
    where: {
      userId: req.user.id
    }
  });

  if (topics.length) {
    const parsedTopics = topics.map(topic => topic.parsedData());
    res.json(Object.assign({}, ...parsedTopics))
  } else {
    res.status(404).json({ Topics: 'No Topics where found for current User' })
  }

});

router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const newTopic = new Topic({
    name: req.body.name,
    type: req.body.type,
    description: req.body.description,
    userId: req.user.id
  });

  try {
    await newTopic.save();
    res.json(newTopic.parsedData())
  } catch (ValidationError) {
    res.status(422).json(errorsParser(ValidationError.errors));
  }
});


router.put('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const topic = await Topic.findByPk(req.params.id);
  try {
    await topic.update({
      name: req.body.name,
      type: req.body.type,
      description: req.body.description
    });

    res.json(topic.parsedData())
  } catch (ValidationError) {
    res.status(422).json(errorsParser(ValidationError.errors))
  }
});

router.delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    await Topic.destroy({
      where: {
        id: req.params.id
      }
    });
    res.json({id: req.params.id});
  } catch (Error) {
    res.status(422).json(Error.errors)
  }

});


module.exports = router;
