'use strict';

const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genre.controller');

router.route('/')
    .post(function(req,res){
        genreController.create(req,res);
    });

router.route('/')
    .get(function(req,res){
        genreController.list(req,res);
    });

module.exports = router;