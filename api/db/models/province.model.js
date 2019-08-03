'use strict';

let mongoose = require("mongoose");

let DistrictSchema = new mongoose.Schema({
  name: { 
      type: String, 
      required: true 
  },
  postalCode: { 
    type: String, 
    required: true 
  }
});

let CountySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  districts: [DistrictSchema]
});

let ProvinceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  counties: [CountySchema]
});

module.exports = mongoose.model('Province', ProvinceSchema);