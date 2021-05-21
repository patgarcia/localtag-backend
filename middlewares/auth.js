module.exports = (req, res, next) => {
  if(req.user) next();
  else {
    console.log("failling auth")
    res.status(403).send("failing auth").end()
  }
}
