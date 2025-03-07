const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bookTitle: String,
    author: String,
    toBeRead: Boolean,
    isFiction: Boolean,
    rating: Number,
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;