const Card = require('../../models/card')
const locations = require('./locationSeed')
const images = require('./imagesSeed')

locations.map(locale, key => {
    Card.create({
        image: images[images.length%key].hq_image_url,
        owner: `ronnieross711`,
        hashtag: '',
        location: locale,
        vote_tally: 0,
        represents_collection: false,
        collectionID: ''
    })
})

