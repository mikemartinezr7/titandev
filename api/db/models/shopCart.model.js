'use strict';

const mongoose = require('mongoose');

let cart_schema = mongoose.Schema({
    date : String,
    subtotal : {type: Number, required:true},
    products : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'product',
    }]
})

module.exports = mongoose.model('shopCart', cart_schema, 'shopCarts');
