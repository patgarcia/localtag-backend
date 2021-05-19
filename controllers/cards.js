const express = require('express')
const router = express.Router()
const Card = require('../models/card')

router.get('/', (req, res) => {
    Card.find()
        .then(docs => res.send(docs))
        .catch(console.error)
})

router.post('/', (req, res) => {
    Card.create(req.body)
        .then(doc => res.send(doc))
        .catch(console.error)
})

router.get('/:id', (req, res) => {
    Card.findById(req.params.id)
        .then(doc => res.send(doc))
        .catch(console.error)
})

router.patch('/:id', (req, res) => {
    Card.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then(doc => res.send(doc))
        .catch(console.error)
})

router.delete('/:id', (req, res) => {
    Card.findByIdAndDelete(req.params.id)
        .then(doc => res.send(doc))
        .catch(console.error)
})

module.exports = router
