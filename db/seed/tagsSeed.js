const Tag = require('../../models/tag');
const tagData = require('./tags.json');

Tag.deleteMany({})
  .then(() =>  Tag.insertMany(tagData))
  .then(console.log)
  .catch(console.error)
  .finally(() => process.exit())