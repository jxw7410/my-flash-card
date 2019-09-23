// Server Configs
const express = require('express');
const app = express();
const db = require('./models/sequelize');

// Allows for reading of body in json format.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Add routes to app
const userRoutes = require('./routes/api/users');
app.use('/api/users', userRoutes);


//Set up jwt passport
const passport = require('passport');
app.use(passport.initialize());
require('./config/passport')(passport);

const server = async () => {
  const port = process.env.PORT || 5000;
  await app.listen(port, () => console.log(`Server is running on port ${port}`));
}

// Add {force: true} as argument for sync to drop database
db.sequelize.sync().then(() => {
  console.log('database synced');
  server();
})
