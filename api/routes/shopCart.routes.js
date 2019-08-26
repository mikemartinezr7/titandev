'use strict';

const express = require('express');
const router = express.Router();
const shopCartController = require('../controllers/shopCart.controller');

//Para las rutas get con id mediante url.
router.param('id', function (req, res, next, id) {
    req.body.id = id;
    next();
});

router.route('obtener-carrito/:id')
    .get(function (req, res) {
        shopCartController.findID(req, res);
    });

router.route('/obtener-carritos')
    .get(function (req, res) {
        shopCartController.findAll(req, res);
    });

router.route('/registrar-carrito')
    .post(function (req, res) {
        shopCartController.register(req, res);
    });

router.route('/agregar-producto')
    .post(function (req, res) {
        shopCartController.updateOne(req, res);
    });

module.exports = router;

