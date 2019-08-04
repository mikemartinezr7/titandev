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
  name: { 
    type: String, 
    required: true 
  },
  counties: [CountySchema]
});

let ProvinceModel = mongoose.model('Province', ProvinceSchema);
let CountyModel = mongoose.model('County', CountySchema);
let DistrictModel = mongoose.model('District', DistrictSchema);

module.exports = { ProvinceSchema, ProvinceModel, CountySchema, CountyModel, DistrictSchema, DistrictModel };
