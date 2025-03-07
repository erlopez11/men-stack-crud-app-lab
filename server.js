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

//Mount Middlewar
app.use(express.urlencoded({extended: false}));

//Routes

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/books/new', (req, res) => {
    res.render('books/new.ejs');
});

app.post('/books', async (req, res) => {
    if (req.body.toBeRead === 'on') {
        req.body.toBeRead = true;
    } else {
        req.body.toBeRead = false;
    }
    await Book.create(req.body);
    res.redirect('/books/new');
});

app.listen(3000, () => {
    console.log('Listening in port 3000');
});