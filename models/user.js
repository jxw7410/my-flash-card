'use strict';

const bcrypt = require('bcryptjs');
const helpers = require('../utils/helper_methods');
const jwt = require('jsonwebtoken');
const key = require('../config/keys');
const KEY_EXP_TIME = 86400; // One day

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: "Email: This is not a proper Email."
        }
      }
    },
    passwordDigest: DataTypes.STRING,
  });

  User.associate = function (models) {
    // associations can be defined here
  };


  // Store to class instance, because 'this' refers to the instance.
  User.prototype.register = function (response) {
    return bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(this.passwordDigest, salt, (err, hash) => {
        if (err) { throw err; }

        this.passwordDigest = hash;
        this.save()
          .then(user => {
            const payload = {id: user.id, username: user.username}
            jwt.sign(
              payload,
              key.secretOrKey,
              {expiresIn: KEY_EXP_TIME},
              (err, token) => {
                response.json({
                  success: true,
                  token: 'Bearer ' + token
                })
              }
            );
          })
          .catch(err => {
            const errors = helpers.errorsParser(err.errors);
            response.status(422).json(errors);
          });
      });
    });
  };


  User.prototype.login = function (response, password) {
    return bcrypt.compare(password, this.passwordDigest)
      .then(isMatch => {
        if (isMatch) {
          const payload = { id: this.id, username: this.username }
          jwt.sign(
            payload,
            key.secretOrKey,
            {expiresIn: KEY_EXP_TIME},
            (err, token) => {
              response.json({
                success: true,
                token: 'Bearer ' + token
              });  
            }
          );
        } else {
          return response.status(400).json({ Password: 'Password is Incorrect' })
        }
      });
  }

  return User;
};