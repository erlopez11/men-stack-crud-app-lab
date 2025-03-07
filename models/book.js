const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bookTitle: String,
    author: String,
    genre: String,
    toBeRead: Boolean,
    starRating: String,
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;