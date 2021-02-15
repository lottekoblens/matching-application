const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const { url } = require('inspector');
const PORT = 3000;
const path = require('path');

// express
app.use('/static', express.static(path.join(__dirname, 'public')));

// handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/views'));


// routing
app.get('/', function (req, res) {
    res.render('home', { 
        style: 'home.css',
        info: '24 jaar, Amsterdam',
        name: 'Lisa Hofman'});
})

app.get('/like', (req, res) => {
    res.render('like', {
         style: 'like.css' });
})

app.get('/dashboard', (req, res) => {
    res.render('dashboard');
})

app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
  })

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));