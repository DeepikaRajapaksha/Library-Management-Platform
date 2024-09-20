const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcrypt');
const User = require('./models/userModel');
const Admin = require('./models/adminModel'); // Admin model

const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '../frontend')));

// MongoDB connection for users and admins (same database)
mongoose.connect('mongodb://127.0.0.1:27017/libraryDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to libraryDB (for users and admins)"))
    .catch((err) => console.error("libraryDB connection error:", err));

// POST route to handle user registration
app.post('/register/user', async (req, res) => {
    const { fullName, username, password, email } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            email,
            role: 'user'
        });

        await newUser.save();
        res.send('User registered successfully!');
    } catch (err) {
        console.error('Error saving user to the database:', err);
        res.status(500).send('Error saving user to the database');
    }
});

// POST route to handle admin registration
app.post('/register/admin', async (req, res) => {
    const { fullName, username, password, email } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({
            fullName,
            username,
            password: hashedPassword,
            email,
            role: 'admin'
        });

        await newAdmin.save();
        res.send('Admin registered successfully!');
    } catch (err) {
        console.error('Error saving admin to the database:', err);
        res.status(500).send('Error saving admin to the database');
    }
});

// POST route for user login
app.post('/login/user', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).send('Invalid username or password');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send('Invalid username or password');
        }
        res.json({ message: 'User login successful', redirectTo: '/User_Home.html' });
    } catch (err) {
        console.error('Error during user login:', err);
        res.status(500).send('Error occurred during user login');
    }
});

// POST route for admin login
app.post('/login/admin', async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(401).send('Invalid username or password');
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).send('Invalid username or password');
        }
        res.json({ message: 'Admin login successful', redirectTo: '/Admin_Home.html' });
    } catch (err) {
        console.error('Error during admin login:', err);
        res.status(500).send('Error occurred during admin login');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
