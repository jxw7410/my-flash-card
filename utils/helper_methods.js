
// Method to parse errors under the format of "errorName: errorMessage"
const errorsParser = errors => {
  const parsedErrors = [];
  errors.forEach(error => {
    for (let i = 0; i < error.message.length; i++) {
      if (error.message[i] === ':' && i !== (error.message.length - 1)) {
        const key = error.message.slice(0, i);
        const value = error.message.slice(i + 1).trim();
        parsedErrors.push({ [key]: value })
        break;
      }
    }
  });

  return parsedErrors;
}


// Method to sign jwt 
const jwt = require('jsonwebtoken');
const key = require('../config/keys');
const KEY_EXP_TIME = 86400; // One day

const signJWT = (payload, callback) => {
  jwt.sign(
    payload,
    key.secretOrKey,
    { expiresIn: KEY_EXP_TIME },
    callback
  )
}




module.exports = {
  errorsParser,
  signJWT
}