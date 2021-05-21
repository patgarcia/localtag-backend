const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/signup", (req, res) => {
  console.log(req.body.password, req.body.email);
  User.findOne({ email: req.body.email }, (err, usr) => {
    if (err) res.send(`Something went wrong: ${err}`);
    if (usr) res.send(`user already exist. Please sign in`);
    else {
      User.create({
        email: req.body.email,
        password: req.body.password,
      }).then((usr) => {
        console.log(usr);
        res.send(`User ${usr.email} created succesfully`);
      });
    }
  });
});

router.post("/login", async (req, res) => {
  console.log(req.body.password, req.body.email);
  const user = await User.findOne({ email: req.body.email });
  const pwdIsCorrect = await user.compPwd(req.body.password);
  if (pwdIsCorrect) {
    req.session.user = user._id;
    res.send(`password is correct ${req.session.user}`);
  } else {
    res.status(403).send("Incorrect password");
  }
});

router.patch("/update", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const pwdIsCorrect = await user.compPwd(req.body.password);
  if (pwdIsCorrect) {
    user.password = req.body.newpassword;
    user.save().then((usr) => res.send(`password updates ${usr.display_name}`));
  } else {
    res.status(403).send("Incorrect password");
  }
});

router.get("/logout", (req, res) => {
  if (req.session && req.session.user) {
    delete req.session.user;
    res.send(`Logged out succesfully`);
  } else {
    res.send("Do nothing. User not logged in");
  }
});

module.exports = router;
