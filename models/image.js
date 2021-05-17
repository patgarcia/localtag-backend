const mongoose = require('../db/connection');
require('mongoose-type-url')
const Schema = mongoose.Schema;

const ImageSchema = new Schema(
    {
        hq_image_url: mongoose.SchemaTypes.Url,
        thumbnail_url: mongoose.SchemaTypes.Url,
        description: String,
        source: String
    },
    { timestamps: true }
);

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image
