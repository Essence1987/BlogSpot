const express = require('express');
const router = express.Router();

// Route handler for the homepage
router.get('/', (req, res) => {
    // Sample data to test until I have the database set up
    const posts = [
        { id: 1, title: 'First Post', content: 'Lorem ipsum...', author: 'John Doe', created_at: '2023-09-20' },
        { id: 2, title: 'Second Post', content: 'Dolor sit amet...', author: 'Jane Smith', created_at: '2023-09-21' },
    ];

    res.render('home', { posts });
});

module.exports = router;