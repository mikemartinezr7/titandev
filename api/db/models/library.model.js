'use strict';

const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const { UserSchema } =  require('./user.model');

const LibrarySchema = mongoose.Schema({
  commercialName: {
    type: String,
    required: true,
  },
  brandName: {
    type: String,
    required: false,
  },
  province: {
    type: String,
    required: false,
  },
  county: {
    type: String,
    required: false,
  },
  district: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: false,
  },
  admin: [UserSchema]
});

module.exports = mongoose.model('Library', LibrarySchema);