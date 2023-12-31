const express = require('express');
const { engine } = require('express-handlebars');
const sequelize = require('./config/config');
const homeRoutes = require('./routes/homeRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const signupRoutes = require('./routes/signupRoutes');
const loginRoutes = require('./routes/loginRoutes');
const moment = require('moment');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

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

// Session middleware configuration
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize, // Use your Sequelize instance
    }),
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // Session expires in 1 day (24 hours)
    },
}));

// Routes
app.use('/', homeRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/signup', signupRoutes);
app.use('/login', loginRoutes);

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
