const Tag = require('../../models/tag');
const seedData = require('./tags.json');

const seedTags = async () => {
    await Tag.deleteMany({});

    const ans = await Promise.all(
        seedData.map(async tag => {
            const t = new Tag(tag);
            return t.save();
        })
    )
        .then(docs => docs)
        .catch(console.error);

    return ans;
};

if (require.main === module) {
    seedTags()
        .then(docs => console.log('INSIDE TAGS', docs))
        .finally(() => process.exit());
} else {
    module.exports = seedTags;
}
