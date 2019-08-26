'use strict';

const mongoose = require('mongoose');

const product_schema = new mongoose.Schema({
    name: String,
    price: Number
})
module.exports = mongoose.model('Product', product_schema, 'products');