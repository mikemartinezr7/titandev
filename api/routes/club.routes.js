'use strict'; 

const express = require('express');
const router = express.Router();
const api_clubs = require('../controllers/club.controller');

router.route('/create_club')
    .post(
        function(req, res){
            api_clubs.create(req, res);
        }
    );

router.route('/list_clubs')
    .get(
        function(req, res){
            api_clubs.list(req, res);
        }
    ),

module.exports = router;