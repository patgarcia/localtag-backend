const Location = require('../../models/location')
const seedData = require('./location.json')

// Location.deleteMany({})
// .then(() => {return Location.insertMany(seedData)})
// .then(console.log)
// .then(console.error)
// .finally(() => {process.exit()})


const seedLocations = async () => {
  await Location.deleteMany({});

  const ans = await Promise.all(
    seedData.map(async location => {
          const l = new Location(location);
          return l.save();
      })
  )
  .then(docs => docs)
  .catch(console.error);

  return ans;
};

if (require.main === module) {
  seedLocations()
      .then(docs => console.log('INSIDE LOCATION', docs))
      .finally(() => process.exit());
} else {
  module.exports = seedLocations;
}