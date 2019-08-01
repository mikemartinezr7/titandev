'use strict'; 

const mongoose = require('mongoose');

let schema_clubs = mongoose.Schema({
    name : {type: String, required : true}, 
    type : {type: String, required : true},
    genre : {type: String, required : true},
    start_time : {type: Number, required : true, unique : true},
    end_time : {type: Number, required : false},
    day : {type: String, required : false},
    branch : {type: String, required : true},
});

module.exports = mongoose.model('Club', schema_clubs); 