const express = require('express');
// Merge params indicate that this is a nested resource
const router = express.Router({mergeParams: true}); 
const passport = require('passport');
const { Question } = require('../../models/sequelize');


// Get 
router.get('/', passport.authenticate('jwt', {session: false}), async (req, res) => {

});



//Post 
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  
});


module.exports = router;
