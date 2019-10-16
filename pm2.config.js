const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  apps : [
    {
      script: "./app.js",
      instances: process.env.NODE_ENV === "production" ? "max" : 2,
      exec_mode: "cluster"
    }
  ]
}