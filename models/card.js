const mongoose = require('../db/connection');
const Schema = mongoose.Schema;

const cardSchema = new Schema(
    {
        image: {
            type: Schema.Types.ObjectId, 
            ref: 'Image'
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        location: {
            type: Schema.Types.ObjectId,
            ref: 'Location'
        },
        vote_tally: Number,
        is_collection_card: Boolean,
        collection_id: {
            type: Schema.Types.ObjectId,
            ref: 'Collection'
        },
    },
    {timestamps: true}
)

cardSchema.methods.populateProperties = async function () {
    const card = this
    const Image = require('./image')
    const Location = require('./location');
    return Location.findById(card.location).then(locationDoc => {
        return Image.findById(card.image).then(imageDoc => {
                card.location = locationDoc
                card.image = imageDoc
        })
        .then(() => card)
    })
}

const Card = mongoose.model('Card', cardSchema);
module.exports = Card
