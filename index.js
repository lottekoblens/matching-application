const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const PORT = 3000;
const path = require('path');

// express
app.use('/static', express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
//     res.send('Hello World');
// })

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/views'));

app.get('/', function (req, res) {
    res.render('home');
})

app.get('/about', (req, res) => {
    res.render('about');
})

app.get('/like', (req, res) => {
    res.send('This is the like page');
})

app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
  })

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));