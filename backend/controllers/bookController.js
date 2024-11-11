const Book = require('../models/bookModel');

// Add a book
const addBook = async (req, res) => {
    try {
        const { title, author, category } = req.body;
        if (!title || !author || !category) {
            return res.status(400).send('All fields are required');
        }
        
        const newBook = new Book({ title, author, category });
        await newBook.save();
        res.status(200).send('Book added successfully');
    } catch (error) {
        console.error('Error adding book:', error);
        res.status(500).send('Error adding book');
    }
};


// Remove a book
const removeBook = async (req, res) => {
    try {
        const { bookId } = req.body;
        await Book.findByIdAndDelete(bookId);
        res.status(200).send('Book removed successfully');
    } catch (error) {
        res.status(500).send('Error removing book');
    }
};

// Edit a book
const editBook = async (req, res) => {
    try {
        const { bookId, newTitle, newAuthor, newCategory } = req.body;
        const updateFields = {};
        if (newTitle) updateFields.title = newTitle;
        if (newAuthor) updateFields.author = newAuthor;
        if (newCategory) updateFields.category = newCategory;
        await Book.findByIdAndUpdate(bookId, updateFields);
        res.status(200).send('Book updated successfully');
    } catch (error) {
        res.status(500).send('Error editing book');
    }
};

module.exports = { addBook, removeBook, editBook };
