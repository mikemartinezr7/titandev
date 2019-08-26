'use strict';

const mongoose = require('mongoose');

const BranchSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El campo "Nombre" es requerido'],
  },
  province: {
    type: String,
    required: [true, 'El campo "Provincia" es requerido'],
  },
  county: {
    type: String,
    required: [true, 'El campo "Cantón" es requerido'],
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
  email: {
    type: String,
    required: [true, 'El campo "Email" es requerido.'],
    validate: {
      validator: function (email) {
        var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
      },
      message: props => `${props.value} no es un email válido`
    },
  },
  phone: {
    type: String,
    required: [true, 'El campo "Teléfono" es requerido.'],
  },
});

module.exports = mongoose.model('Branch', BranchSchema);