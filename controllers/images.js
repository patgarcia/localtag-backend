const express = require('express');
const router = express.Router();
const Image = require('../models/image')

router.get('/', (req, res) => {
    Image.find()
      .then(docs => res.send(docs))
      .catch(console.error)
})

router.post('/', (req, res) => {
  Image.create(req.body)
    .then(doc => res.send(doc))
    .catch(console.error)
})

router.get('/:id', (req, res) => {
  Image.findById(req.params.id)
    .then(doc => res.send(doc))
    .catch(console.error)
})

router.patch('/:id', (req, res) => {
  Image.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(doc => res.send(doc))
    .catch(console.error)
})

router.delete('/:id', (req, res) => {
  Image.findByIdAndDelete(req.params.id)
    .then(doc => res.send(doc))
    .catch(console.error)
})

module.exports = router
