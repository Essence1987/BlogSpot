const express = require('express');
const router = express.Router();

// Route handler for the dashboard
router.get('/dashboard', (req, res) => {

    // Sample data to test until I have the database set up
    const userPosts = [
        { id: 1, title: 'My First Post', content: 'This is my first post...', created_at: '2023-09-22' },
        { id: 2, title: 'Another Post', content: 'Another blog post content...', created_at: '2023-09-23' },
    ];

    res.render('dashboard');
});

module.exports = router;