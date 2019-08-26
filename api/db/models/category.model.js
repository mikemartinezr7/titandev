'use strict';

let mongoose = require('mongoose');

let CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    genres: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre',
      }],
    details: { 
        type: String}
});

module.exports = mongoose.model('Category', CategorySchema)