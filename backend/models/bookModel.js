const mongoose = require('mongoose');

// Define the schema for the Book model
const bookSchema = new mongoose.Schema({
    bookId: { 
        type: String, 
        required: true, 
        unique: true // Ensures each book has a unique ID 
    },
    title: { 
        type: String, 
        required: true 
    },
    author: { 
        type: String, 
        required: true 
    },
    category: { 
        type: String, 
        required: true 
    },
    borrowedStatus: { 
        type: Boolean, 
        default: false 
    },
    borrowDate: { 
        type: Date, 
        default: null 
    },
});

// Export the Book model
module.exports = mongoose.model('Book', bookSchema);



