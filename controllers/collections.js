const express = require('express');
const router = express.Router();
const Collection = require('../models/collection')

router.get('/', (req, res) => {
  let detail = req.query.detail
  if(detail == 'true'){
    Collection.find().then(collections => {
      Promise.all(collections.map(coll => {
          return coll.populateProperties()
            .then(doc => doc)
        })).then(data => res.send(data))
      })
  }
  else(
  Collection.find()
    .then(docs => res.send(docs))
    .catch(console.error)
  )
})

router.post('/', (req, res) => {
  Collection.create(req.body)
    .then((doc) => res.send(doc))
    .catch(console.error)
})

router.get('/:id', (req, res) => {
  let detail = req.query.detail
  if(detail == 'true'){
    Collection.findById(req.params.id).then(collection => {
      return collection.populateProperties()
        .then(doc => doc)
    }).then(data => res.send(data))
  }
  else(
  Collection.findById(req.params.id)
    .then(doc => res.send(doc))
    .catch(console.error)
  )
})

router.patch('/:id', (req, res) => {
  Collection.findByIdAndUpdate(req.params.id, req.body, {new: true} )
    .then(doc => res.send(doc))
    .catch(console.error)
})

router.delete('/:id', (req, res) => {
  Collection.findByIdAndDelete(req.params.id)
    .then(doc => res.send(doc))
    .catch(console.error)
})

module.exports = router
