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

const Collection = mongoose.model('Collection', collectionSchema);

module.exports = Collection
