'use strict';

let mongoose = require("mongoose");

let categorySchema = new mongoose.Schema({
    nameCat: {type: String, required: true}
});

module.exports = mongoose.model('Genre',categorySchema);