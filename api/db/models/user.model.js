'use strict';

let mongoose = require('mongoose');
let randToken = require('rand-token').generator({ chars: '0-9' });

let UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'El campo "Primer nombre" es requerido']
  },
  middleName: {
    type: String,
    required: false
  },
  firstLastName: {
    type: String,
    required: [true, 'El campo "Primer Apellido" es requerido']
  },
  secondLastName: {
    type: String,
    required: false
  },
  gender: {
    type: String,
    required: [true, 'El campo "Género" es requerido']
  },
  id: {
    type: String,
    unique: true,
    required: [true, 'El campo "Número de Identificación" es requerido'],
  },
  idType: {
    type: String,
    required: [true, 'El campo "Tipo de Identificación" es requerido']
  },
  birthDate: {
    type: Date,
    required: false
  },
  province: {
    type: String,
    required: false
  },
  county: {
    type: String,
    required: false
  },
  district: {
    type: String,
    required: false
  },
  additionalDetails: {
    type: String,
    required: false
  },
  favoriteGenres: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Genre',
    required: false
  }],
  favoriteBook: {
    type: String
  },
  favoriteAuthor: {
    type: String
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'El campo "Email" es requerido'],
    validate: {
      validator: function (email) {
        var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
      },
      message: props => `${props.value} no es un email válido`
    },
  },
  avatar: {
    type: String,
    required: false
  },
  nickname: {
    type: String,
    unique: [true, 'El campo "Nickname" debe ser unico. Actualmente existe un usuario con ese Nick'],
    required: false
  },
  password: {
    type: String,
    default: ''
  },
  randomToken: {
    type: String,
    default: function () {
      return randToken.generate(6)
    }
  },
  type: {
    type: String,
    required: true,
    enum: ['admin', 'library', 'client']
  },
  exchange: {
    type: Boolean,
  }
});

let UserModel = mongoose.model('User', UserSchema);

UserModel.schema.path('id').validate(function (value, respond) { 
  UserModel.findOne({ id: value }, function (err, user) { 
    if (err) 
      throw err;

    if (user) {
      return false;
    }

    return true;
  });
}, 'Id Exists');

module.exports = { UserSchema, UserModel };
