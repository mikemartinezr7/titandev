'use strict';

let mongoose = require("mongoose");

let CountySchema = new mongoose.Schema({
    name : {type: String, required: true},
    districts : [{type: mongoose.Schema.Types.ObjectId, ref: 'District', required: true}]
});

module.exports = mongoose.model('County',CountySchema);