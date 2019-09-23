const express = require("express");
const router = express.Router();
const User = require('../../models/sequelize').user;



router.post('/register', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if (user) {
      return res.status(400).json({ Email: 'A user has already been registered under that email' });
    } else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        passwordDigest: req.body.password
      });
      newUser.register(res);
    }
  })
});


router.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if (!user) {
      return res.status(404).json({ Email: "Email is not registered in the system" });
    } else {
      user.login(res, req.body.password);
    }
  })
})

module.exports = router;