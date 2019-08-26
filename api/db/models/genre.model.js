'use strict';

let mongoose = require("mongoose");

let GenreSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: false}
});

module.exports = mongoose.model('Genre',GenreSchema);