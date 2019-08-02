'use strict';

const express = require ('express');
const router  = express.Router();
const controller_authors = require('../controllers/authors.controller');

router.route ('/create_authors')
.post
(
    function(req,res)
    {
        controller_authors.create(req,res); 
    }

);

router.route('/list_authors')
.get
(
    function(req, res)
    {
        controller_authors.list(req,res);
    }

);


module.exports = router;