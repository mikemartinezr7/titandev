'use strict';

const express = require('express');
const router = express.Router();
const districtsController = require('../controllers/district.controller');

router.route('/')
    .post(function(req,res){
        districtsController.create(req,res);
    });

router.route('/')
    .get(function(req,res){
        districtsController.list(req,res);
    });

module.exports = router;