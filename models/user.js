'use strict';

const bcrypt = require('bcryptjs');
const { signJWT } = require('../utils/helper_methods');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Username: Username cannot be empty"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Email: Email cannot be empty."
        },
        isEmail: {
          args: true,
          msg: "Email: This is not a proper Email."
        },
        isUnique
      }
    },
    passwordDigest: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 64],
          msg: "Password: Min of 8 and Max of 64 characters for password."
        }
      }
    }
  });


  // Sequelize Hooks, or lifecycle callbacks. They are all async.


  User.beforeCreate( user => {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) { reject(err) };

        bcrypt.hash(user.passwordDigest, salt, (err, hash) => {
          if (err) { reject(err) }
          user.passwordDigest = hash;
          return resolve(user);
        })
      })
    })
  });



  // Associations
  User.associate = function (models) {
      User.hasMany(models.Topic, {
        as: "Topics",
        foreignKey: "userId"
      });
    };


  //Model helper methods.

  /*  
    Custom unique validation because there is no built in one during validation phase.
    Also defined like this for hoisting.
  */
  async function isUnique(email, next) {
    try {
      const user = await User.findOne({ where: { email } });
      if (user) {
        return next("Email: This Email is already in used.");
      }
      return next();
    } catch (err) { return next(err) }
  }


  // Model class methods

  User.prototype.login = async function (response, password) {
    const isMatch = await bcrypt.compare(password, this.passwordDigest)

    if (isMatch) {
      const payload = { id: this.id, username: this.username }
      return signJWT(payload, (err, token) =>
        response.json({
          success: true,
          token: 'Bearer ' + token
        })
      );
    }

    response.status(400).json([ {LoginError: 'Password and/or Email are incorrect'}])
  }
  
  return User;
};