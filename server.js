const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

// Set Handlebars as the template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Uses the homeRoutes.js file for the homepage
app.use('/', require('./routes/homeRoutes'));

// Starts the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
