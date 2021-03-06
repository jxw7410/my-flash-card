const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const key = require('./keys');
const { User } = require('../models/sequelize');

const options = {}
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = key.secretOrKey;

module.exports = passport => {
  passport.use(new JwtStrategy(options, (jwtPayload, done) => {
    User.findByPk(jwtPayload.id)
      .then( user => {
        if (user) {
          return done(null, user)
        } 
        return done(null, false);
      })
      .catch( err => console.log(err));
  }));
};