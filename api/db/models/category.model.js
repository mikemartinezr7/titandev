'use strict';

let mongoose = require('mongoose');

let CategorySchema = mongoose.Schema({
    categoryname: {type: String, required: true},
    details: {type: String, required: true}
});

module.exports = mongoose.model('Category', CategorySchema)