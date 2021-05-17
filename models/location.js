const mongoose = require('../db/connection');
const Schema = mongoose.Schema;

const locationSchema = new Schema(
    {
        lat: Number,
        long: Number,
        city: String,
        state: String,
        country: String
    }
);

const Location = mongoose.model('Location', locationSchema);

module.exports = Location
