//Dependencies
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
//Import Book Model
const Book = require('./models/book');
const methodOverride = require('method-override');
const morgan = require('morgan');

//Initialize Express App
const app = express();
//config code
dotenv.config();

//Initialize Connection to MongoDB
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
});

//Mount Middleware
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(express.static('public'));
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
    res.redirect('/books');
});

app.get('/books', async (req, res) => {
    const bookshelf = await Book.find({});
    res.render('books/index.ejs', {books: bookshelf});
});

app.get('/books/:bookId', async (req, res) => {
    const foundBook = await Book.findById(req.params.bookId);
    res.render('books/show.ejs', {book: foundBook});
});

app.delete('/books/:bookId', async (req, res) => {
    await Book.findByIdAndDelete(req.params.bookId);
    res.redirect('/books');
});

app.get('/books/:bookId/edit', async (req, res) => {
    const foundBook = await Book.findById(req.params.bookId);
    res.render('books/edit.ejs', {book: foundBook});
});

app.put('/books/:bookId', async (req, res) => {
    if (req.body.toBeRead === 'on') {
        req.body.toBeRead = true;
    } else {
        req.body.toBeRead = false;
    }
    await Book.findByIdAndUpdate(req.params.bookId, req.body);
    res.redirect(`/books/${req.params.bookId}`);
});

app.listen(3000, () => {
    console.log('Listening in port 3000');
});