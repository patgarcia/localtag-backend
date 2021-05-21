const User = require('../models/user')

const getUser = (req, res, next) => {
  if(req.session){
    console.log(req.session);
    User.findById(req.session.user)
      .then(user => {
        if(user) req.user = user;
        else {
          delete req.user
          delete req.session.user
        }
        next();
      })
      .catch(console.error)
  }
  else{
    next();
  }
}

module.exports = getUser
