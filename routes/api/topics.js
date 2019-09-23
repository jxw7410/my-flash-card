const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/test', passport.authenticate('jwt', {session: false}), (req, res)=>{
   res.json({msg: "success"}); 
});


module.exports = router;
