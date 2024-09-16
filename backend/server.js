const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcrypt'); // For password hashing
const User = require('./models/userModel'); // Import the User model

const app = express();
const port = 3000;

// Middleware to parse form data from the frontend
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS) from the "frontend" folder
app.use(express.static(path.join(__dirname, '../frontend')));

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/libraryDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
   .then(() => console.log("Connected to MongoDB"))
   .catch((err) => console.error("MongoDB connection error: ", err));

// POST route to handle user registration
app.post('/register', async (req, res) => {
    const { fullName, username, password, email, role } = req.body;

    try {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user object with the form data
        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            email,
            role
        });

        // Save the user data to MongoDB
        await newUser.save();
        res.send('User registered successfully!');
    } catch (err) {
        console.error('Error saving user to the database:', err);
        res.status(500).send('Error saving user to the database');
    }
});

// POST route to handle user login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).send('Invalid username or password');
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send('Invalid username or password');
        }

        res.send('Login successful');
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).send('Error occurred during login');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
