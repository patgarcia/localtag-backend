const express = require('express');
const router = express.Router();
const Location = require('../models/location')

router.get('/', (req, res) => {
  Location.find()
    .then(docs => res.send(docs))
    .catch(console.error)
})

router.post('/', (req, res) => {
  Location.create(req.body)
    .then((doc) => res.send(doc))
    .catch(console.error)
})

router.get('/:id', (req, res) => {
  Location.findById(req.params.id)
    .then(doc => res.send(doc))
    .catch(console.error)
})

router.patch('/:id', (req, res) => {
  Location.findOneAndUpdate({_id: req.params.id}, req.body, {new: true} )
    .then(doc => res.send(doc))
    .catch(console.error)
})

router.delete('/:id', (req, res) => {
  Location.findOneAndDelete({_id: req.params.id})
    .then(doc => res.send(doc))
    .catch(console.error)
})

module.exports = router
