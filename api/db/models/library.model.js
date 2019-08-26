'use strict';

const mongoose = require('mongoose');
const { UserSchema } =  require('./user.model');
const { BranchSchema } =  require('./branch.model');

mongoose.set('useCreateIndex', true);

const LibrarySchema = mongoose.Schema({
  commercialName: {
    type: String,
    required: [true, 'El campo "Nombre comercial" es requerido'],
  },
  brandName: {
    type: String,
    required: false,
  },
  province: {
    type: String,
    required: [true, 'El campo "Provincia" es requerido'],
  },
  county: {
    type: String,
    required: [true, 'El campo "Canton" es requerido'],
  },
  district: {
    type: String,
    required: [true, 'El campo "Distrito" es requerido'],
  },
  address: {
    type: String,
    required: [true, 'El campo "Señas particulares" es requerido'],
  },
  location: {
    type: String,
    required: false,
  },
  image: { 
    type: String,
    require: false
  },
  active: {
    type: Boolean,
    require: true,
    default: false
  },
  admin: [UserSchema],
  branches: [BranchSchema]
});

let LibraryModel = mongoose.model('Library', LibrarySchema);

module.exports = { LibrarySchema, LibraryModel };