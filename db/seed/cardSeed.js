const Card = require('../../models/card')
const seedData = require('./cards.json')

Card.deleteMany({})
.then(() => {return Card.insertMany(seedData)})
.then(console.log)
.then(console.error)
.finally(() => {process.exit()})
