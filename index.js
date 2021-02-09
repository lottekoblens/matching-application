const camelCase = require('camelcase');
camelCase('foo-bar');
console.log(camelCase('foo-bar'));
//camelcase werkt goed


const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.get('/about', (req, res) => {
    res.send('This is the about');
})

app.get('/like', (req, res) => {
    res.send('This is the like page');
})

app.listen(3000);