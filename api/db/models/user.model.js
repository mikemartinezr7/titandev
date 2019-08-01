'use strict';

let mongoose = require('mongoose');
let randToken = require('rand-token').generator({chars: '0-9'});

let UserSchema = new mongoose.Schema({
    firstName : {type: String, required: true},
    middleName : {type: String},
    firstLastName : {type: String, required: true},
    secondLastName : {type: String},
    gender : {type: String, required: true},
    id : {type: String, unique: true, required: true},
    province : {type: String, required: false},
    county : {type: String, required: false},
    district : {type: String, required: false},
    additionalDetails : {type: String, required: false},
    favoriteGenres : [{type: mongoose.Schema.Types.ObjectId, ref: 'Genre', required: false}],
    favoriteBook : {type: String},
    favoriteAuthor : {type: String},
    email : {type: String, unique: true, required: true},
    avatarURL : {type: String},
    nickname:  {type: String, unique: true, required: true},
    password: {type: String},
    randomToken: {type: String, default: function(){return randToken.generate(6)}}
});

try {
    module.exports = mongoose.model('User')
} catch {
    module.exports = mongoose.model('User',UserSchema)
};