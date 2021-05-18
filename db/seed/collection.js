const Collection = require('../../models/collection')
const seedData = require('./collections.json')

Collection.deleteMany({})
.then(() => {return Collection.insertMany(seedData)})
.then(console.log)
.then(console.error)
.finally(() => {process.exit()})
