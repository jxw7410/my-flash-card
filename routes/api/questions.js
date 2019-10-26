const express = require('express');
// Merge params indicate that this is a nested resource
const router = express.Router({mergeParams: true}); 
const passport = require('passport');
const { Question } = require('../../models/sequelize');
const { errorsParser } = require('../../utils/helper_methods');

// Index
router.get('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
  const questions = await Question.findAll({
    where: {
      topicId: req.params.topicId
    }
  });


  if (questions.length) {
    const parsedQuestions = questions.map( question => question.parseData())
    res.json(Object.assign( {}, ...parsedQuestions));
  } else {
    res.status(404).json([{ Questions: 'No Questions where found'}]);
  }
});

// Get Count
router.get('/count', passport.authenticate('jwt', {session: false}), async (req, res) => {
  const count = await Question.count({
    where: {
      topicId: req.params.topicId
    }
  })

  res.json({ count });
});



//Post 
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const newQuestion = new Question({
    question: req.body.question,
    answer: req.body.answer,
    topicId: req.params.topicId
  })

  try {
    await newQuestion.save();
    res.json(newQuestion.parseData());
  } catch(ValidationError) {
    res.status(422).json(errorsParser(ValidationError));
  }
});


// Edit
router.put('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const question = await Question.findByPk(req.params.id);
  try {
    await question.update({
      question: req.body.question,
      answer:  req.body.answer
    });

    res.json(question.parseData());
  } catch (ValidationError){
    res.status(422).json(errorsParser(ValidationError));
  }
});

// Delete 
router.delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    await Question.destroy({
      where: {
        id: req.params.id
      }
    });

    res.json({questionId: req.params.id});
  } catch (Error) {
    res.status(422).json([{ Error: "An unknown Error has occured." }])
  }
});


module.exports = router;
