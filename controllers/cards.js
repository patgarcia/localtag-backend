const express = require("express");
const router = express.Router();
const Card = require("../models/card");
const auth = require("../middlewares/auth");

router.get("/", (req, res) => {
  let detail = req.query.detail;
  if (detail == "true") {
    Card.find().then((cards) => {
      Promise.all(
        cards.map((card) => {
          return card.populateProperties().then((doc) => doc);
        })
      ).then((data) => res.send(data));
    });
  } else
    Card.find()
      .then((docs) => res.send(docs))
      .catch(console.error);
});

router.get("/collection/:coll_id", (req, res) => {
  let detail = req.query.detail;
  if (detail == "true") {
    Card.find({ collection_id: req.params.coll_id }).then((cards) => {
      Promise.all(
        cards.map((card) => {
          return card.populateProperties().then((doc) => doc);
        })
      ).then((data) => res.send(data));
    });
  } else
    Card.find({ collection_id: req.params.coll_id })
      .then((docs) => res.send(docs))
      .catch(console.error);
});

router.post("/", auth, (req, res) => {
  Card.create(req.body)
    .then((doc) => res.send(doc))
    .catch(console.error);
});

router.get("/:id", (req, res) => {
  let detail = req.query.detail;
  if (detail == "true") {
    Card.findById(req.params.id)
      .then((card) => {
        return card.populateProperties().then((doc) => doc);
      })
      .then((data) => res.send(data));
  } else
    Card.findById(req.params.id)
      .then((doc) => res.send(doc))
      .catch(console.error);
});

router.patch("/:id", auth, (req, res) => {
  Card.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((doc) => res.send(doc))
    .catch(console.error);
});

router.delete("/:id", auth, (req, res) => {
  Card.findByIdAndDelete(req.params.id)
    .then((doc) => res.send(doc))
    .catch(console.error);
});

module.exports = router;
