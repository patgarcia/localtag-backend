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
        hashtag: String,
        location: {
            type: Schema.Types.ObjectId,
            ref: 'Location'
        },
        vote_tally: Number,
        represents_collection: Boolean,
        collectionID: String,
    },
    {timestamps: true}
)

const Card = mongoose.model('Card', cardSchema);
module.exports = Card
