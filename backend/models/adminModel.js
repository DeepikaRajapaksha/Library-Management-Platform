const mongoose = require('mongoose');

// Define the admin schema
const adminSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    membershipId: { type: String, unique: true },  // New field for membership ID
    role: { type: String, default: 'admin' }
});

// Create the Admin model (stored in the 'admins' collection)
const Admin = mongoose.model('Admin', adminSchema, 'admins');

module.exports = Admin;

