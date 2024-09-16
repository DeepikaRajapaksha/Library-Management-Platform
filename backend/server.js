const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express(); // Creates an express app
const port = 3000; // Server will run on localhost:3000

// Use body-parser to read form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve frontend (HTML, CSS, JS files) from the "public" folder
app.use(express.static('public'));

// Connect to MongoDB (this assumes MongoDB is installed on your computer)
mongoose.connect('mongodb://localhost:27017/libraryDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

// Define a user schema (how user data will be structured)
const userSchema = new mongoose.Schema({
    fullName: String,
    username: String,
    password: String,
    email: String,
    role: String
});

// Create a model (User) based on the schema
const User = mongoose.model('User', userSchema);

// Handle the form submission
app.post('/register', (req, res) => {
    const { fullName, username, password, email, role } = req.body;

    const newUser = new User({
        fullName,
        username,
        password,
        email,
        role
    });

    // Save the new user to the database
    newUser.save((err) => {
        if (err) {
            res.status(500).send('Error saving user to the database');
        } else {
            res.send('User registered successfully!');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
