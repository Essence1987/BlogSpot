const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

// Set Handlebars as the template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
