// Init
const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');

// Options
app.use(helmet())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use(express.static(__dirname + 'public/'));

// Middleware
// Users middleware

// Controllers
app.use(require('./controllers'))

// Listen
const port=4000;
app.listen(port, () => console.log(`app running on port ${port}`));
