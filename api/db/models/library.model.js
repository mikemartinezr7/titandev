'use strict';

const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true)

let validateEmail = function(email) {
    let emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email);
}

const LibrarySchema = mongoose.Schema({
    commercialName: {
        type: String,
        required: true,
    },
    brandName: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: false,
    },
    adminDni: {
        type: String,
        required: true,
    }, 
    adminEmail: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [validateEmail, 'E-mail debe ser valido']
    },
    adminPassword: {
        type: String,
        required: true,
    },
    adminGenre: {
        type: String,
        required: false,
        enum: ['M', 'F']
    },
    adminBirthDate: {
        type: Date,
        required: true
    },
    adminFirstName: {
        type: String,
        required: true,
    },
    adminSecondName: {
        type: String,
        required: false,
    },
    adminLastName1: {
        type: String,
        required: true,
    },
    adminLastName2: {
        type: String,
        required: true,
    },
});
 
module.exports = mongoose.model('Library', LibrarySchema);