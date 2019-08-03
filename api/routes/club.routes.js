'use strict'; 

const express = require('express');
const router = express.Router();
const clubsController = require('../controllers/club.controller');

router.route('/')
    .post(function(req, res){
            clubsController.create(req, res);
        });

router.route('/')
    .get(
        function(req, res){
            clubsController.list(req, res);
        }
    ),

router.route('/name')
    .get(
        function(req, res){
            clubsController.findClub(req, res);
        }
    ),

module.exports = router;