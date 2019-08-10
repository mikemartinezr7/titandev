'use strict'; 

const express = require('express');
const router = express.Router();
const clubsController = require('../controllers/club.controller');

router.param('id_club', function(req, res, next, id_club){
    req.body.id_club = id_club;
    next();
});

router.route('/')
    .post(function(req, res){
            clubsController.create(req, res);
        });

router.route('/')
    .get(function(req, res){
            clubsController.list(req, res);
        });

router.route('/name')
    .get(function(req, res){
            clubsController.findClub(req, res);
        });

router.route('/:id_book')
    .get(function(req, res){
        booksController.findBookID(req, res);
        });

module.exports = router;