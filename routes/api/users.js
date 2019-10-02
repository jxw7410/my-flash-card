const express = require("express");
const router = express.Router();
const { User } = require('../../models/sequelize');
const { signJWT, errorsParser } = require('../../utils/helper_methods');


router.post('/register', async (req, res) => { 
  // This function is asynchronous. Look for in the user model.
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      passwordDigest: req.body.password
    });

    const payload = { id: user.id, username: user.username}
    signJWT(payload, (err, token) => {
      if (err) { res.status(400).json[{Error: "Unable to authenticate."}]}

      res.json({
        success: true,
        token: 'Bearer ' + token
      });
    })
    
  } catch (ValidationError){
    res.status(422).json(errorsParser(ValidationError.errors));
  }
  
});


router.post('/login', async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req.body.email
    }
  });

  if (!user) {
    // This is done to abstract from users which is wrong.
    return res.status(404).json([{ LoginError: 'Password and/or Email are incorrect' }])
  } else {
    user.login(res, req.body.password);
  }

})

module.exports = router;