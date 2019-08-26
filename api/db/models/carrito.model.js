'use strict';
// import mongoose_producto from './producto.model';
const mongoose = require('mongoose');
const producto = require('./producto.model');

const carrito_schema = new mongoose.Schema({
    fecha: String,
    subtotal: { type: Number, required: true },
    producto: [{

        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto',


    }]
})

module.exports = mongoose.model('Carrito', carrito_schema, 'carritos');