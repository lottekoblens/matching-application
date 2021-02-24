const express = require('express');

const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const slug = require('slug');
const ejs = require('ejs');

const urlencodedParser = bodyParser.urlencoded({ extended: true });
const mongoose = require('mongoose');
const testingModel = require('./models/test.model');
require('dotenv').config();

const dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`;
mongoose.connect(dbUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});

// express
app
  .use('/static', express.static(path.join(__dirname, 'public')))
  .use(bodyParser.json())
  .use(urlencodedParser)
  .set('view engine', 'ejs')
  .set('views', path.join(__dirname, '/views'));

app.param('id', function (request, response, next, id) {
  const _profile = `${id}-req`;
  request.profileId = _profile;
  next();
});

// routing
app.get('/', async (req, res) => {
  const allUsers = await findAllPeopleNotVisited();
  // console.log(allUsers);
  const firstUser = allUsers[0];
  const userID = allUsers[0].id;

  res.render('home', {
    style: 'home.css',
    name: 'lisa',
    firstUser,
    userID,
  });
});

app.post('/', function (req, res) {
  // console.log(req.body);
  updateData(req.body.id, req.body.liked);
  res.redirect('/');
});

app.get('/like', async (req, res) => {
  const liked = await findAllPeopleLiked();
  const likedPeople = liked[0].id;
  res.render('like', {
    style: 'like.css',
    liked,
    likedPeople,
  });
});

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!");
});

app.listen(port, () => console.log(`Server listening on port: ${port}`));

function updateData(id, liked) {
  testingModel
    .findOneAndUpdate({ id }, { $set: { liked, visited: true } })
    .lean()
    .then((data) => {
      // console.log(data);
    });
}

async function findAllPeopleNotVisited() {
  const data = await testingModel
    .find({ visited: false })
    .lean()
    .then((data) => data);
  // console.log(data);

  return data;
}

async function findAllPeopleLiked() {
  const data = await testingModel
    .find({ liked: true })
    .lean()
    .then((data) => data);
  return data;
}
