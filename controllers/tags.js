const express = require('express');
const router = express.Router();

const Tag = require('../models/tag');

router.get('/', (req, res) => {
  Tag.find()
    .then(docs => res.send(docs))
    .catch(console.error)
})

router.post('/', (req, res) => {
  Tag.create( req.body )
    .then(doc => res.send(doc))
    .catch(console.error)
})

router.get('/:id', (req, res) => {
  Tag.findById(req.params.id)
    .then(doc => res.send(doc))
    .catch(console.error)
})

router.patch('/:id', (req, res) => {
  Tag.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(doc => res.send(doc))
    .catch(console.error)
})

router.put('/:id', (req, res) => {
  Tag.findOneAndReplace({_id: req.params.id}, req.body, {new: true})
    .then(doc => res.send(doc))
    .catch(console.error)
})

router.delete('/:id', (req, res) => {
  Tag.findByIdAndDelete(req.params.id)
    .then(doc => res.send(doc))
    .catch(console.error)
})

module.exports = router