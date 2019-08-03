'use strict';

let mongoose = require("mongoose");

let DistrictSchema = new mongoose.Schema({
    name : {type: String, required: true},
    postalCode: {type: String, required:true}
});

module.exports = mongoose.model('District',DistrictSchema);