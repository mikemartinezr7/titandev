'use strict';

const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');

router.route('/')
    .post(function(req,res){
        categoryController.create(req,res);
    });

router.route('/')
    .get(function(req,res){
        categoryController.list(req,res);
    });

module.exports = router;