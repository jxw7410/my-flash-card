'use strict';


// Please check the .notes file for more information regarding this file.

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];


let sequelize = new Sequelize(config.database, config.username, config.password, config);
// Database object representation for all models
const db = {
  user: sequelize.import('./user.js')
};


Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
