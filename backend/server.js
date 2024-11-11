const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcrypt');
const User = require('./models/userModel');
const Admin = require('./models/adminModel'); // Admin model
// Book model
const Book = require('./models/bookModel');  // You'll create this file for books

const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '../frontend')));
const session = require('express-session');

// Configure the session middleware
app.use(session({
    secret: 'yourSecretKey',  // Replace with a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Set `secure: true` in production when using HTTPS
}));


// MongoDB connection for users and admins (same database)
mongoose.connect('mongodb://127.0.0.1:27017/libraryDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to libraryDB (for users and admins)"))
    .catch((err) => console.error("libraryDB connection error:", err));


    // Your existing registration route
app.post('/register/user', async (req, res) => {
    const { fullName, username, password, email } = req.body;
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Generate membership ID (e.g., MID-1234)
        const membershipId = 'MID-' + Math.floor(1000 + Math.random() * 9000);

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            email,
            role: 'user',
            membershipId  // Add the membership ID here
        });

        await newUser.save();  // Save the new user to the database
        res.json({ success: true, message: 'Registration successful!' });
    } catch (err) {
        console.error('Error saving user to the database:', err);
         res.status(500).json({ success: false, message: 'Registration failed!' });
    }
});

    

// POST route to handle admin registration
app.post('/register/admin', async (req, res) => {
    const { fullName, username, password, email } = req.body;
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Generate membership ID (e.g., MID-1234)
        const membershipId = 'AID-' + Math.floor(1000 + Math.random() * 9000);

        const newAdmin = new Admin({
            fullName,
            username,
            password: hashedPassword,
            email,
            role: 'admin',
            membershipId  // Add the membership ID here
        });

        await newAdmin.save();  // Save the new user to the database
        res.json({ success: true, message: 'Registration successful!' });
    } catch (err) {
        console.error('Error saving user to the database:', err);
         res.status(500).json({ success: false, message: 'Registration failed!' });
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

        // Save user ID in session after successful login
        req.session.userId = user._id;

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

        // Save admin ID in session after successful login
        req.session.adminId = admin._id;

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

// Add this route in your `server.js` file
// Your search route
app.get('/search', async (req, res) => {
    const query = req.query.q;

    try {
        const books = await Book.find({ title: { $regex: query, $options: 'i' } });
        if (books.length > 0) {
            res.json({ success: true, books });
        } else {
            res.json({ success: false, message: 'Book not found' });
        }
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ success: false, message: 'Server error occurred' });
    }
});

app.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.json({ success: true, books });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Database error' });
    }
});

// Borrow book route
app.post('/borrow', async (req, res) => {
    const { bookTitle, borrowDate } = req.body;

    try {
        // Find the book by title
        const book = await Book.findOne({ title: bookTitle });

        if (!book) {
            return res.json({ success: false, message: 'Book not found.' });
        }

        if (book.borrowedStatus) {
            return res.json({ success: false, message: 'Book is already borrowed.' });
        }

        // Update the book's borrowed status
        book.borrowedStatus = true;
        book.borrowDate = borrowDate; // Add borrowDate if needed in schema
        await book.save();

        res.json({ success: true, message: 'Book borrowed successfully!' });
    } catch (error) {
        console.error('Borrow error:', error);
        res.status(500).json({ success: false, message: 'Server error occurred.' });
    }
});

app.get('/profile', async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    try {
        const user = await User.findById(req.session.userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Send user details, including membershipId, to the frontend
        res.json({
            success: true,
            user: {
                username: user.username,
                email: user.email,
                membershipId: user.membershipId // Ensure membershipId is sent
            }
        });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});


