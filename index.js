const express = require('express');

const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const slug = require('slug');
const ejs = require('ejs');

const urlencodedParser = bodyParser.urlencoded({ extended: true });
const mongoose = require('mongoose'); // used mongoose for connection with database
const testingModel = require('./models/test.model');
require('dotenv').config();

// database connection
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
  .set('views', path.join(__dirname, '/views'))
  .get('/', async (req, res) => {
    try {
      const allUsers = await findAllPeopleNotVisited();
      const firstUser = allUsers[0];
      const userID = allUsers[0].id;

      res.render('home', {
        style: 'home.css',
        firstUser,
        userID,
      });
    } catch (e) {
      console.log(e);
      res.redirect('/nomorepeople');
    }
  })
  .get('/like', async (req, res) => {
    try {
      const liked = await findAllPeopleLiked();
      const likedPeople = liked[0].id;
      res.render('like', {
        style: 'like.css',
        liked,
        likedPeople,
      });
    } catch (e) {
      res.redirect('/nobodyliked');
    }
  })
  // nobody is liked page
  .get('/nobodyliked', async (req, res) => {
    res.render('nobodyliked', {
      style: 'like.css',
    });
  })
  // no more people to display
  .get('/nomorepeople', async (req, res) => {
    res.render('nomorepeople', {
      style: 'home.css',
    });
  })
  // post request when liked or disliked
  .post('/', (req, res) => {
    updateData(req.body.id, req.body.liked);
    res.redirect('/');
  })
  // post request when profile is deleted from liked list
  .post('/like', (req, res) => {
    unlike(req.body.id);
    res.redirect('like');
  })
  // error when page is not found
  .use((req, res, next) => {
    res.status(404).send("Sorry can't find that!");
  });

// sources images:
// https://www.cosmopolitan.com/nl/lifestyle/a21188626/de-lekkerste-dingen-bij-de-mcdonalds/
// https://www.stuff.co.nz/life-style/food-wine/food-news/114766115/nutritionists-concerned-about-mcdonalds-free-cheeseburger-offer
// https://www.mirror.co.uk/money/mcdonalds-denies-shrunk-size-tiny-21565403
// https://www.shape.com/weight-loss/management/high-fat-diet-can-torpedo-your-metabolism
// https://www.dailyrecord.co.uk/lifestyle/food-drink/revealed-vegan-burgers-can-contain-13996710
// https://www.nasdaq.com/articles/better-buy%3A-mcdonalds-vs.-costco-2020-06-05
// https://www.express.co.uk/life-style/diets/599896/McDonald-s-food-challenge-Big-Mac-an-hour
// https://unsplash.com/photos/EtCPbDaN4ak
// https://www.independent.co.uk/life-style/weight-loss-diet-fat-mcdonalds-calories-nutrition-super-size-me-ryan-williams-exercise-a8632016.html
// https://www.youtube.com/watch?app=desktop&v=xD8T7SrhLjU
// https://twitter.com/mcdonalds/status/923632426206851072

// id is found and updated and liked and visited will be set to true
function updateData(id, liked) {
  testingModel
    .findOneAndUpdate({ id }, { $set: { liked, visited: true } })
    .lean()
    // lean zorgt dat querie sneller wordt uitgevoerd (is not necesarry)
    .then((data) => {
      console.log(data);
    }); // then stands for: when data is found, you gotta do this
}

// profile from liked page will be deleted from list
function unlike(userID) {
  testingModel
    .findOneAndUpdate({ id: userID }, { $set: { liked: false } })
    .lean()
    .then((data) => {
      console.log(data);
    });
}

// people of which visited is false will be found
async function findAllPeopleNotVisited() {
  const data = await testingModel.find({ visited: false }).lean();
  return data;
}

// people of which liked is true will be found
async function findAllPeopleLiked() {
  const data = await testingModel.find({ liked: true }).lean();
  return data;
}

app.listen(port, () => console.log(`Server listening on port: ${port}`));
