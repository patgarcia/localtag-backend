const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

/*=================
  collection cards
 =================*/

router.get("/", auth, (req, res) => {
  if (req.session.count) req.session.count++;
  else req.session.count = 1;

  if (req.session && req.user) {
    res.send(`Hey there ${req.user.display_name}`);
  } else {
    res.send("Hello, please sign in");
  }
});

/*======
  Routes
 =======*/

// User
router.use("/tags", require("./tags"));
router.use("/images", require("./images"));
router.use("/locations", require("./locations"));
router.use("/collections", require("./collections"));
router.use("/cards", require("./cards"));
router.use("/auth", require("./auth"));

module.exports = router;
