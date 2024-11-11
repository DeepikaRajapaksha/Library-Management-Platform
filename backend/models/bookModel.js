const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    borrowedStatus: { type: Boolean, default: false },
    borrowDate: { type: Date, default: null },
});

module.exports = mongoose.model('Book', bookSchema);


