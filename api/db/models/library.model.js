'use strict';

const mongoose = require('mongoose');

const LibrarySchema = mongoose.Schema({
    field: {
        type: String,
        required: true,
    }
});
 
 
module.exports = mongoose.model('Library', LibrarySchema);