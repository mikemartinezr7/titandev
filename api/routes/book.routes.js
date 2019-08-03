'use strict'; 

const express = require('express');
const router = express.Router();
const booksController = require('../controllers/book.controller');

router.route('/create_book')
    .post(function(req, res){
            booksController.create(req, res);
        });

router.route('/list_books')
    .get(function(req, res){
            booksController.list(req, res);
        })

module.exports = router;