const mongoose = require('../db/connection');
const Schema = mongoose.Schema;

const collectionSchema = new Schema(
    {
      name: String,
      owner: {
          type: Schema.Types.ObjectId, 
          ref: 'User'
      },
      location: {
          type: Schema.Types.ObjectId,
          ref: 'Location'
      },
      tag: {
          type: Schema.Types.ObjectId,
          ref: 'Tag'
      }  
    },
    { timestamps: true }
);

collectionSchema.methods.populateProperties = async function () {
    const coll = this;
    const Tag = require('./tag');
    const Location = require('./location');
    return Location.findById(coll.location).then(locationDoc => {
        return Tag.findById(coll.tag).then(tagDoc => {
            coll.location = locationDoc;
            coll.tag = tagDoc;
        })
        .then(() => coll)
    })
};

const Collection = mongoose.model('Collection', collectionSchema);

module.exports = Collection
