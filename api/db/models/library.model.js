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
    require: false,
    validate: {
      validator: function (filename) {
        var regex = /.*\.(gif|jpe?g|bmp|png|webp)$/igm;
        return regex.test(filename);
      },
      message: props => `El archivo de imagen <strong>${props.value}</strong> no es un formato de archivo válido.`
    },
    
  },
  admin: [UserSchema]
});

module.exports = mongoose.model('Library', LibrarySchema);