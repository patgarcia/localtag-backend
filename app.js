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

