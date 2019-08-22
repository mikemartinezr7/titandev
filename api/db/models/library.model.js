'use strict';

const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const { UserSchema } =  require('./user.model');

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
  admin: [UserSchema]
});

module.exports = mongoose.model('Library', LibrarySchema);