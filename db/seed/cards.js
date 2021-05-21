const Collection = require('../../models/collection');
const Card = require('../../models/card');
const seedUsers = require('./users');
const seedLocations = require('./locations');
const seedTags = require('./tags');
const seedImages = require('./images');

seedLocations().then(locations => {
    console.log('inside locations');
    seedUsers().then(users => {
        console.log('inside users');
        seedTags().then(async tags => {
            seedImages().then(async images => {
                await Collection.deleteMany({});
                const collections = locations.map((l, i) => ({
                    name: `My collection #${i}`,
                    tag: tags[i % tags.length]._id,
                    owner: users[i % users.length]._id,
                    location: l._id,
                    image: images[i % images.length]._id
                }));
                Collection.insertMany(collections).then(async collection_docs => {
                    await Card.deleteMany({});
                    const cards = locations.map((l, i) => ({
                        image: images[i % images.length]._id,
                        owner: users[i % users.length]._id,
                        location: l._id,
                        vote_tally: 0,
                        is_collection_card: false,
                        collection_id:
                            collection_docs[i % collection_docs.length]._id,
                    }));
                    Card.insertMany(cards)
                        .then(docs => console.log(docs))
                        .finally(() => process.exit());
                });
            });
        });
    });
});
