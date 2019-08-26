'use strict';

const mongoose = require('mongoose');

const producto_schema = new mongoose.Schema({
    nombre: String,
    precio: Number
})
module.exports = mongoose.model('Producto', producto_schema, 'productos');