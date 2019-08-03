'use strict';

const express = require('express');
const router = express.Router();
const provincesController = require('../controllers/province.controller');

router.route('/')
    .post(function(req,res){
        provincesController.create(req,res);
    });

router.route('/')
    .get(function(req,res){
        provincesController.list(req,res);
    });

module.exports = router;