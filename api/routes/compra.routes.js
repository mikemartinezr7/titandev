'use strict';

const express = require('express');
const router = express.Router();
const compraController = require('../controllers/compra.controller');

//router.param('id_book', function (req, res, next, id_book) {
    //req.body.id_book = id_book;
    //next();
//});

router.route('/compras')
    .get(function (req, res) {
        compraController.list(req, res);
    });


router.route('/')
    .post(function (req, res) {
        compraController.create(req, res);
    });
module.exports = router;