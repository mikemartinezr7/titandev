'use strict'; 

const express = require('express');
const router = express.Router();
const booksController = require('../controllers/book.controller');

router.param('id_book', function(req, res, next, id_book){
    req.body.id_book = id_book;
    next();

});

router.route('/')
    .post(function(req, res){
            booksController.create(req, res);
        });

router.route('/')
    .get(function(req, res){
            booksController.list(req, res);
        });

router.route('/name')
    .get(function(req, res){
        booksController.findBook(req, res);
    });

router.route('/:id_book')
    .get(function(req, res){
        booksController.findBookID(req, res);
    });

router.route('/:id_book')
    .get(function(req, res){
        booksController.update(req, res);
    });

module.exports = router;