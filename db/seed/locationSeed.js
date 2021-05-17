const Location = require('../../models/location')
const seedData = require('./locations.json')

Location.deleteMany({})
.then(() => {return Location.insertMany(seedData)})
.then(console.log)
.then(console.error)
.finally(() => {process.exit()})
