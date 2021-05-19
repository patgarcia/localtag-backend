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
router.use('/tags', require('./tags'));
router.use('/images', require('./images'));
router.use('/locations', require('./locations'));
// Collection
router.use('/cards', require('./cards'))

module.exports = router
