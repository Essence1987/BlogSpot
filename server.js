const express = require('express');
const {engine} = require('express-handlebars');
const sequelize = require('./config/config');
const homeRoutes = require('./routes/homeRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const signupRoutes = require('./routes/signupRoutes');
const moment = require('moment');


const app = express();

// format dates helper with Handlebars
const hbs = engine({
    partialsDir: __dirname + '/views/layouts',
    helpers: {
      formatDate: function (date) {
        return moment(date).format('MMMM DD, YYYY'); // Define desired date format
      },
    },
  });

// Set Handlebars as the template engine
app.engine('handlebars', hbs);
app.set('view engine', 'handlebars');
app.set("views", "./views");


// Uses the homeRoutes.js file for the homepage
app.use('/', homeRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/signup', signupRoutes);

// Other routes and middleware will go here

// Starts the server
const PORT = process.env.PORT || 3000;
sequelize.sync({ force: false }) // Sync database tables
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to sync database tables:', err);
  });
