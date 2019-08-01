'use strict';

let mongoose = require("mongoose");

let ProvinceSchema = new mongoose.Schema({
    name : {type: String, required: true},
    counties : [{type: mongoose.Schema.Types.ObjectId, ref: 'County', required: true}]
});

module.exports = mongoose.model('Province',ProvinceSchema);