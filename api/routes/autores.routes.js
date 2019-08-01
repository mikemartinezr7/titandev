'use strict';

const express = require ('express');
const router  = express.Router();
const controller_autor = require('../controllers/autores.controller');

router.route ('/create_autores')
.post
(
    function(req,res)
    {
        controller_autor.create(req,res); 
    }

);

router.route('/list_autores')
.get
(
    function(req, res)
    {
        controller_autor.list(req,res);
    }

);


module.exports = router;