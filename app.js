// Init
const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const { Store } = require('express-session');
const mongoStore = require('connect-mongodb-session')(session);


// Session store
mongoURI = 
  process.env.NODE_ENV === 'production' ?
  process.env.DB_URL : 
  'mongodb://localhost/localtag';
const store = new mongoStore({
  uri: mongoURI,
  collection: 'sessions'
})

// Options
app.use(helmet())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(session({
  secret: 'some secret', // TODO: Add env var logic
  cookie: {
    secure: true,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24, // a day
  },
  store: store,
  resave: true,
  saveUninitialized: true
}));

// Routes
app.use(express.static(__dirname + 'public/'));

// Middleware
// Users middleware

// Controllers
app.use(require('./controllers'))

// Listen
const port=4000;
app.listen(port, () => console.log(`app running on port ${port}`));
