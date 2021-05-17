const express = require('express');
const router = express.Router();

/*=================
  collection cards
 =================*/

 router.get('/', (req, res) => {
  res.send(
    "THIS WILL RETURN THE COLLECTION OF CARDSSSSS"
    )
})

/*======
  Routes
 =======*/

// User
// Tag
<<<<<<< HEAD
// Image
router.use('/locations', require('./locations'))
router.get('/images', (req, res) => {
  Image.find({})
    .then(images => {
      console.log(images)
      res.send(images)
    })
})

=======
router.use('/images', require('./images'))
>>>>>>> Seed data json file; seed js file to add it to db; controllers/index.js refers to controllers/images.js; controllers/images.js includes CRUD routes
// Location
// Collection
// Card

module.exports = router
