const User = require('../../models/user')
const seedUsers = require('./users');

seedUsers().then(users => {
  console.log("INSIDE TEST", users)
}).finally(() => process.exit());