'use strict'; 

const mongoose = require('mongoose');

let schema_books = mongoose.Schema({
    name : {type: String, required : true}, 
    genre : {type: String, required : true},
    price : {type: Number, required : true},
    author : {type: String, required : true},
    isbn : {type: String, required : true, unique : true},
    description : {type: String, required : false},
    image : {type: String, required : false},
    quantity : {type: Number, required : true},
    editorial : {type: String, required : true},
    year : {type: Date, required : true},
    language : {type: String, required : true},
    type : {type: String, required : true}
});

module.exports = mongoose.model('Book', schema_books); 