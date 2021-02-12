const camelCase = require('camelcase');
camelCase('foo-bar');
console.log(camelCase('foo-bar'));
//camelcase werkt goed


const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const PORT = 3000;

// express
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.get('/about', (req, res) => {
    res.send('This is the about');
})

app.get('/like', (req, res) => {
    res.send('This is the like page');
})

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
  })

// Handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
})