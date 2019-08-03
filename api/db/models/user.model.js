'use strict';

let mongoose = require('mongoose');
let randToken = require('rand-token').generator({ chars: '0-9' });

let UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  middleName: {
    type: String,
    required: false
  },
  firstLastName: {
    type: String,
    required: true
  },
  secondLastName: { 
    type: String,
    required: false
  },
  gender: { 
    type: String, 
    required: true 
  },
  id: { 
    type: String, 
    unique: true, 
    required: true 
  },
  idType: { 
    type: String, 
    required: true 
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
    required: true 
  },
  avatarURL: { 
    type: String,
    required: false 
  },
  nickname: { 
    type: String, 
    unique: true, 
    required: false 
  },
  password: { 
    type: String, 
    required: false 
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
  }
});

module.exports = mongoose.model('User', UserSchema);