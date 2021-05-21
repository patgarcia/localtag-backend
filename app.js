// Init
const connection = require('./db/connection')
const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const userMiddleware = require('./middlewares/users')
const mongoStore = require('connect-mongo');

// Static
app.use(express.static(__dirname + 'public/'));

// Session store
mongoURI = 
  process.env.NODE_ENV === 'production' ?
  process.env.DB_URL : 
  'mongodb://localhost/localtag';
const store = mongoStore.create({
  mongoUrl: mongoURI,
  collection: 'sessions'
})

// Options
app.use(helmet())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(session({
  secret: '343ji43j4n3jn4jk3n',
  store: store,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 24, // a day
  },
  resave: true,
  saveUninitialized: true
}));
app.use(userMiddleware)

// Middleware
// Users middleware

// Controllers
app.use(require('./controllers'))


const port = 
  process.env.NODE_ENV === 'production' ?
  process.env.PORT : 4000;
// Listen
app.listen(port, '0.0.0.0');