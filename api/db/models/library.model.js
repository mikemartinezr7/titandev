'use strict';

const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

/*let validateEmail = function (email) {
  let emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailRegex.test(email);
}*/

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
  }
});

module.exports = mongoose.model('Library', LibrarySchema);