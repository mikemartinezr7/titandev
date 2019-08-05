'use strict';

const express = require ('express');
const router  = express.Router();
const controller_authors = require('../controllers/authors.controller');

router.route ('/')
.post
(
    function(req,res)
    {
        controller_authors.create(req,res); 
    }

);

router.route('/')
.get
(
    function(req, res)
    {
        controller_authors.list(req,res);
    }

);

router.route('/firstname')
    .get(function(req, res){
        authorsController.findAuthor(req, res);
    })

module.exports = router;