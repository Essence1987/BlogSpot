const express = require('express');
const router = express.Router();

// Route handler for displaying the login page
router.get('/', (req, res) => {
    res.render('login'); // Render the login page
});

// Route handler for processing the login form submission
router.post('/login', async (req, res) => {
    try {
        // Get user input from the login form
        const { username, password } = req.body;

        // Check if the user exists in the database
        const user = await User.findOne({ where: { username } });

        if (!user) {
            // User not found, render login form with an error message
            return res.render('login', { error: 'Invalid username or password. Please try again.' });
        }

        // Check if the provided password matches the stored hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            // Passwords do not match, render login form with an error message
            return res.render('login', { error: 'Invalid username or password. Please try again.' });
        }

        // If credentials are valid, create a user session
        req.session.user = {
            id: user.id,
            username: user.username,
            loggedIn: true,
        };

        // Redirect to the dashboard upon successful login
        res.redirect('/dashboard');
    } catch (error) {
        // Handle any login errors (e.g., database errors)
        console.error('Login error:', error);
        res.render('login', { error: 'Login failed. Please try again.' });
    }
});

module.exports = router;