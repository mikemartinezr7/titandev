'use strict';

const express = require('express');
const router = express.Router();
const genresController = require('../controllers/genre.controller');

router.route('/')
    .post(function(req,res){
        genresController.create(req,res);
    });

router.route('/')
    .get(function(req,res){
        genresController.list(req,res);
    });

module.exports = router;