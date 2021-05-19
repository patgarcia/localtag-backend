const Card = require('../../models/card')
const seedUsers = require('./users');
const seedLocations = require('./locations');
const seedImages = require('./images');

seedLocations().then(locations => {
    console.log('inside locations');
    seedUsers().then(users => {
        console.log('inside users');
        seedImages().then(async images => {
            await Card.deleteMany({});
            const cards = locations.map((l, i) =>({
              image: images[i % images.length]._id,
              owner: users[i % users.length]._id,
              location: l._id,
              vote_tally: 0,
              is_collection_card: false,
              // missing collectionID
            }));
            Card.insertMany(cards)
              .then(docs => console.log(docs))
              .finally(() => process.exit())
        });
    });
});
