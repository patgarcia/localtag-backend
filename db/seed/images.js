const Image = require('../../models/image');
const seedData = require('./images.json');


const seedImages = async () => {
    await Image.deleteMany({});

    const ans = await Promise.all(
        seedData.map(async image => {
            const i = new Image(image);
            return i.save();
        })
    )
        .then(docs => docs)
        .catch(console.error);

    return ans;
};

if (require.main === module) {
    seedImages()
        .then(docs => console.log('INSIDE IMAGES', docs))
        .finally(() => process.exit());
} else {
    module.exports = seedImages;
}
