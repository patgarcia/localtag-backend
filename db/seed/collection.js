const Collection = require('../../models/collection')
const seedUsers = require('./users');
const seedLocations = require('./locations');
const seedTags = require('./tags');

seedLocations().then(locations => {
    console.log('inside locations');
    seedUsers().then(users => {
        console.log('inside users');
        seedTags().then(async tags => {
            await Collection.deleteMany({});
            const collections = locations.map((l, i) =>({
              name: `My collection #${i}`,
              tag: tags[i % tags.length]._id,
              owner: users[i % users.length]._id,
              location: l._id,
            }));
            Collection.insertMany(collections)
              .then(docs => console.log(docs))
              .finally(() => process.exit())
        });
    });
});
