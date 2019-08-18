'use strict'; 

const mongoose = require('mongoose');

let schema_books = mongoose.Schema({
    name : {type: String, required : true},
    image : {type: String, required : false},
    genre : {type: String, required : true}, 
    author : {type: String, required : true},
    description : {type: String, required : false},
    year : {type: Date, required : true},
    editorial : {type: String, required : true},
    type : {type: String, required : true},
    language : {type: String, required : true},
    isbn : {type: String, required : true, unique : true},
    price : {type: Number, required : true},
    quantity : {type: Number, required : true},
    status : {type: String, required : true}
});

module.exports = mongoose.model('Book', schema_books); 