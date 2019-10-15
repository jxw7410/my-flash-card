const Sequelize = require('sequelize');



module.exports = {
  development: {
    username: "postgres",
    password: "postgres",
    database: "flashcard_app_development",
    host: "127.0.0.1",  //Change to psql for docker to work, 127.0.0.1 for localhost
    port : "5432",
    dialect: "postgres",
    operatorsAliases: Sequelize.Op,
  },
  test: {
    username: "postgres",
    password: "postgres",
    database: "flashcard_app_development",
    host: "127.0.0.1",
    port: "5432",
    dialect: "postgres",
    operatorsAliases: Sequelize.Op,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    port: "5432",
    dialect: "postgres",
    operatorsAliases: false
  }
}
