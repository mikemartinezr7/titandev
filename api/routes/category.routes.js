'use strict';

const express = require('express');
const router = express.Router();
const categorycontroller = require('../controllers/category.controller');

router.route('/')
    .post(function(req,res){
        categorycontroller.create(req,res);
    });

router.route('/')
    .get(function(req,res){
        categorycontroller.list(req,res);
    }
    );

module.exports = router;