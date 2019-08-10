'use strict';

const express = require('express');
const router = express.Router();
const usersController = require('../controllers/user.controller');

router.route('/')
    .post(function(req,res){
        usersController.create(req,res);
    });

router.route('/')
    .get(function(req,res){
        usersController.list(req,res);
    })

router.route('/password')
    .get(function(req,res){
        usersController.get_password(req,res);
    })

router.route('/password')
.post(function(req,res){
    usersController.save_password(req,res);
})


router.route('/randomToken')
.get(function(req,res){
    usersController.get_token(req,res);
})

module.exports = router;