const express = require('express');
const router = express.Router();

/*=================
  collection cards
 =================*/

 router('get', (req, res) => {
  res.send(
    "THIS WILL RETURN THE COLLECTION OF CARDS"
    )
})

/*======
  Routes
 =======*/

// User
// Tag
// Image
// Location
// Collection
// Card

module.exports = router
