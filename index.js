const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const { url } = require('inspector');
const PORT = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const slug = require('slug');

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
         style: 'like.css',
        //  information: [
        //     {info:'24 jaar, Amsterdam'}, 
        //     {info: '26 jaar, Amstelveen'},
        //     {info: '23 jaar, Diemen'},
        //     {info:'24 jaar, Hoofddorp'},
        //     {info:'23 jaar, Amsterdam'}
        // ],
         people: [
            {name:'Lisa Hofman', age:'24 jaar', residence: 'Amsterdam', product: 'Hamburger'}, 
            {name:'Thomas Bergen', age: '26 jaar', residence: 'Amstelveen', product: 'Cheeseburger'},
            {name:'Julia Fransen', age:'23 jaar', residence: 'Diemen', product:'Cheeseburger'},
            {name:'Sanne Groot', age:'24 jaar', residence: 'Hoofddorp', product:'Hamburger'},
            {name:'Kim Verdonge', age:'23 jaar', residence: 'Amsterdam', product: 'Big Mac'},
            {name:'Kim Verdonge', age:'23 jaar', residence: 'Amsterdam', product: 'Hamburger'}
        ],
         product: [
            {option:'Hamburger'}, 
            {option: 'Cheeseburger'},
            {option:'Big Mac'}
        ] });

        // function randomProfile(people){
        //     return people[Math.floor(Math.random()*people.length)];
        // }
        // console.log(randomProfile(people));
});

//body-parser
// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/like",function(req,res){
    const data = req.body;
    res.send("response");
    res.redirect('/');
})

// app.post('/like', like);

// function like(req, res) {
//     data.push ({
//         name: req.body.name,
//         age: req.body.age,
//         residence: req.body.residence
//     })
//     res.redirect('/')
// }

app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!");
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));