// adminRoutes.js
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Route to handle adding a new book (admin only)
router.post('/addBook', bookController.addBook);

module.exports = router;
