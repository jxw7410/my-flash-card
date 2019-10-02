const express = require("express");
const router = express.Router();
const { User } = require('../../models/sequelize');


router.post('/register', async (req, res) => { 

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    passwordDigest: req.body.password
  });

  // This function is asynchronous. Look for in the user model.
  newUser.register(res);
});


router.post('/login', async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req.body.email
    }
  });

  if (!user) {
    return res.status(404).json([{ Email: "Email is not registered in the system" }]);
  } else {
    user.login(res, req.body.password);
  }

})

module.exports = router;