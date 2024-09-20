const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: 'user' }
});

// Create the User model (in the 'users' collection)
const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
