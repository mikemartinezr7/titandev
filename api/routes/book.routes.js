'use strict'; 

const express = require('express');
const router = express.Router();
const booksController = require('../controllers/book.controller');

router.route('/')
    .post(function(req, res){
            booksController.create(req, res);
        });

router.route('/')
    .get(function(req, res){
            booksController.list(req, res);
        })

router.route('/name')
    .get(function(req, res){
        booksController.findBook(req, res);
    })

module.exports = router;