const User = require('../models/userModel');

// Controller function for user login
const userLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username, password });
        if (!user) {
            return res.status(401).send('Invalid username or password');
        }
        res.send('Login successful'); // Customize response as needed
    } catch (err) {
        res.status(500).send('Error occurred during login');
    }
};

// Add more controller functions as needed

module.exports = {
    userLogin
};
