const express = require("express");
const router = express.Router();
const Tag = require("../models/tag");
const auth = require("../middlewares/auth");

router.get("/", (req, res) => {
  Tag.find()
    .then((docs) => res.send(docs))
    .catch(console.error);
});

router.post("/", auth, (req, res) => {
  Tag.create(req.body)
    .then((doc) => res.send(doc))
    .catch(console.error);
});

router.get("/:id", (req, res) => {
  Tag.findById(req.params.id)
    .then((doc) => res.send(doc))
    .catch(console.error);
});

router.patch("/:id", auth, (req, res) => {
  Tag.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((doc) => res.send(doc))
    .catch(console.error);
});

router.put("/:id", auth, (req, res) => {
  Tag.findOneAndReplace({ _id: req.params.id }, req.body, { new: true })
    .then((doc) => res.send(doc))
    .catch(console.error);
});

router.delete("/:id", auth, (req, res) => {
  Tag.findByIdAndDelete(req.params.id, { new: true })
    .then((doc) => res.send(doc))
    .catch(console.error);
});

module.exports = router;
