// bookController.js
const Book = require('../models/bookModel');

// Controller function to handle adding a book
const addBook = async (req, res) => {
    const { title, author, category } = req.body;

    if (!title || !author || !category) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
        const newBook = new Book({
            title,
            author,
            category
        });

        await newBook.save();

        res.status(201).json({ success: true, message: 'Book added successfully', book: newBook });
    } catch (error) {
        console.error('Error adding book:', error);
        res.status(500).json({ success: false, message: 'Failed to add book' });
    }
};

module.exports = { addBook };
