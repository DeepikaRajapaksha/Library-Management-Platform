// bookModel.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    category: String,
    borrowedStatus: Boolean,
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
