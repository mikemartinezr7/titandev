'use strict';

const mongoose = require('mongoose');
const  {schema_books} = require('./book.model');

const schema_compra = mongoose.Schema({
    date: {type: String, required: true},
    subtotal: { type: Number, required: true },
    books: [schema_books]
})

let comprasModel = mongoose.model('Compra',schema_compra)

module.exports = {schema_compra, comprasModel}
