'use strict';

const bcrypt = require('bcryptjs');
const {signJWT, errorsParser} = require('../utils/helper_methods');


module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true, 
        msg: 'Email: This Email already exists.'
      },
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: "Email: This is not a proper Email."
        }
      }
    },
    passwordDigest: {
      type: DataTypes.STRING,
      allowNull: false,
      len:{
        args: [8, 100],
        msg: "Password: Minimum of 8 and Max of 32 characters for password."
      }
    }
  });

  User.associate = function (models) {
    // User has many Topics
    User.hasMany(models.Topic, {
      as: "Topics",
      foreignKey: "userId"
    });
  };


  // Store to class instance, because 'this' refers to the instance.
  User.prototype.register = async function (response) {
    await bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(this.passwordDigest, salt, async (err, hash) => {
        if (err) { throw err; }

        this.passwordDigest = hash;
        try {
          await this.save();
          const payload = { id: this.id, username: this.username }
          signJWT(payload, (err, token) =>
            response.json({
              success: true,
              token: 'Bearer ' + token
            })
          );
        } catch (ValidationError) {
          response.status(422).json(errorsParser(ValidationError.errors));
        }
      });
    });
  };


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

    response.status(400).json({ Password: 'Password is Incorrect' })
  }

  return User;
};