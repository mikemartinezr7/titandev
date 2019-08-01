'use strict'; 

const express = require('express');
const router = express.Router();
const api_books = require('../controllers/book.controller');

router.route('/create_book')
    .post(
        function(req, res){
            api_books.create(req, res);
        }
    );

router.route('/list_books')
    .get(
        function(req, res){
            api_books.list(req, res);
        }
    ),

module.exports = router;