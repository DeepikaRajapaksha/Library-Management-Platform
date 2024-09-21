// bookModel.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    category: String,
    borrowedStatus: { type: Boolean, default: false },
    borrowDate: { type: Date } // Add this field for borrow date
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
