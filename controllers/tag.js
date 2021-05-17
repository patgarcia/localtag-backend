const express = require('express');
const router = express.Router();
const Tag = require('../models/tag');

router.get('/', (req, res) => {
  Tag.find()
    .then(docs => res.send(docs))
    .catch(console.error)
})
