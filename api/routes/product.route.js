'use strict';

const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

//Para las rutas get con id mediante url.
router.param('id', function (req, res, next, id) {
    req.body.id = id;
    next();
});

router.route('/obtener-productos')
    .get(function (req, res) {
        productController.findAll(req, res);
    });

router.route('/registrar-producto')
    .get(function (req, res) {
        productController.register(req, res);
    });

module.exports = router;