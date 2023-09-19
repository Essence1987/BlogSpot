const express = require('express');
const exphbs = require('express-handlebars');
const sequelize = require('./config/config');
const homeRoutes = require('./routes/homeRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();

// Set Handlebars as the template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Uses the homeRoutes.js file for the homepage
app.use('/', homeRoutes);
app.use('/dashboard', dashboardRoutes);

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
