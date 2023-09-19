const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('signup');
});

// POST Route for saving data from the registration form
router.post('/signup', async (req, res) => {
    try {
      // Get user input from the registration form
      const { username, password } = req.body;
  
      // Check if the user already exists in the database
      const existingUser = await User.findOne({ where: { username } });
  
      if (existingUser) {
        // If the user already exists, render the registration form with an error message
        return res.render('signup', { error: 'Username already taken. Please choose another.' });
      }
  
      // If the user doesn't exist, hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
  
      // Create a new user record in the database
      const newUser = await User.create({ username, password: hashedPassword });
  
      // Redirect to the dashboard or login page upon successful registration
      res.redirect('/dashboard');
    } catch (error) {
      // Handle any registration errors (e.g., database errors, validation errors)
      console.error('Registration error:', error);
      res.render('signup', { error: 'Registration failed. Please try again.' });
    }
  });

  module.exports = router;