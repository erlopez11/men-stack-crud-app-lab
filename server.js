//Dependencies
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
//Import Book Model
const Book = require('./models/book');

//Initialize Express App
const app = express();
//config code
dotenv.config();

//Initialize Connection to MongoDB
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
});

//Routes

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/books/new', (req, res) => {
    res.send('This route sends the user a form page so they can add new books!');
})

app.listen(3000, () => {
    console.log('Listening in port 3000');
});