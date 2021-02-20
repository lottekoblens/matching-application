const express = require('express');
const app = express();
// const exphbs = require('express-handlebars');
const { url } = require('inspector');
const PORT = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const slug = require('slug');
const ejs = require('ejs');

const urlencodedParser = bodyParser.urlencoded({extended: false});

const people =  [
    {id: 0, img: '/static/images/girl-mc.jpg', name:'Lisa Hofman', age:'24 jaar', residence: 'Amsterdam', product: 'Hamburger'}, 
    {id: 1, img: '/static/images/man-cheeseburger.jpg',name:'Thomas Bergen', age: '26 jaar', residence: 'Amstelveen', product: 'Cheeseburger'},
    {id: 2, img: '/static/images/girl-cheeseburger.jpg',name:'Julia Fransen', age:'23 jaar', residence: 'Diemen', product:'Cheeseburger'},
    {id: 3, img: '/static/images/woman-burger.jpg',name:'Sanne Groot', age:'24 jaar', residence: 'Hoofddorp', product:'Hamburger'},
    {id: 4, img: '/static/images/girl-bigmac.jpg',name:'Kim Verdonge', age:'23 jaar', residence: 'Amsterdam', product: 'Big Mac'},
    {id: 5, img: '/static/images/girl-mc.jpg',name:'Kim Verdonge', age:'23 jaar', residence: 'Amsterdam', product: 'Hamburger'}
];

let testID = 1;
console.log(people.find(item => {
return item.id === testID
}))

// console.log(people[1].name);

// express
app.use('/static', express.static(path.join(__dirname, 'public')));

// handlebars
// app.engine('ejs', ejs({ defaultLayout: 'header' }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));


// routing
app.get('/', function (req, res) {
    res.render('home',  
        {style: 'home.css', 
        name: 'lisa',
        people: people
    });
})

app.get('/like', (req, res) => {
    res.render('like', {
         style: 'like.css',
         people: people
    });
});

// function randomProfile(people){
//     return people[Math.floor(Math.random()*people.length)];
// }
// console.log(randomProfile(people));

//body-parser
// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", urlencodedParser, function(req,res){
    // console.log(req.body.people);
    // const data = req.body;
    res.send("response");
    // res.redirect('home');
    // res.render ('like', { data });
})

app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!");
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));