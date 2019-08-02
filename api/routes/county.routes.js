'use strict';

const express = require('express');
const router = express.Router();
const countiesController = require('../controllers/county.controller');

router.route('/')
    .post(function(req,res){
        countiesController.create(req,res);
    });

router.route('/')
    .get(function(req,res){
        countiesController.list(req,res);
    });

module.exports = router;