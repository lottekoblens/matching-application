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

// const people = [
// {
// id: 0,
// img: '/static/images/girl-mc.jpg',
// name: 'Lisa Hofman',
// age: '24 jaar',
// residence: 'Amsterdam',
// product: 'Hamburger',
// },
// {
// id: 1,
// img: '/static/images/man-cheeseburger.jpg',
// name: 'Thomas Bergen',
// age: '26 jaar',
// residence: 'Amstelveen',
// product: 'Cheeseburger',
// },
// {
// id: 2,
// img: '/static/images/girl-cheeseburger.jpg',
// name: 'Julia Fransen',
// age: '23 jaar',
// residence: 'Diemen',
// product: 'Cheeseburger',
// },
// {
// id: 3,
// img: '/static/images/woman-burger.jpg',
// name: 'Sanne Groot',
// age: '24 jaar',
// residence: 'Hoofddorp',
// product: 'Hamburger',
// },
// {
// id: 4,
// img: '/static/images/girl-bigmac.jpg',
// name: 'Kim Verdonge',
// age: '23 jaar',
// residence: 'Amsterdam',
// product: 'Big Mac',
// },
// {
// id: 5,
// img: '/static/images/girl-mc.jpg',
// name: 'Kim Verdonge',
// age: '23 jaar',
// residence: 'Amsterdam',
// product: 'Hamburger',
// },
// ];

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
  console.log(req.body);
  updateData(req.body.id, req.body.liked);
  res.redirect('/');
});

app.get('/like', (req, res) => {
  res.render('like', {
    style: 'like.css',
    people,
  });
});

app.get('/profile/:id', function (request, response) {
  response.send(request.profileId);
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
      console.log(data);
    });
}

async function findAllPeopleNotVisited() {
  const data = await testingModel
    .find({ visited: false })
    .lean()
    .then((data) => data);

  return data;
}
