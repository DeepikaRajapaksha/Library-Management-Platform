const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to handle user login
router.post('/user/login', userController.userLogin);

// Add more routes as needed

module.exports = router;
