// Allows for usage .env to load environment variables.
const dotenv = require('dotenv');
dotenv.config();

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
const topicRoutes = require('./routes/api/topics');
const questionRoutes = require('./routes/api/questions');

app.use('/api/users', userRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/topics/:topicId/questions', questionRoutes);

//Set up jwt passport
const passport = require('passport');
app.use(passport.initialize());
require('./config/passport')(passport);

const serverInit = async () => {
  const port = process.env.PORT || 5000;
  await app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

// Add {force: true} as argument for sync to drop database
db.sequelize.sync().then(() => {
  console.log('database synced');
  serverInit();
})