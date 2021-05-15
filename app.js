// Init
const express = require('express');
const app = express();

// Options
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(express.static(__dirname + 'public/'));

// Middleware
// Users middleware

// Controllers
app.use(require('./controllers'))

// Listen
const port=4000;
app.listen(port, () => console.log(`app running on port ${port}`));
