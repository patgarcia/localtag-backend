const mongoose = require('../db/connection');
const Schema = mongoose.Schema;

const TagSchema = new Schema(
    {
        name: String,
    },
    { timestamps: true }
);

const Tag = mongoose.model('Tag', TagSchema);

module.exports = Tag