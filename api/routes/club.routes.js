'use strict';

const express = require('express');
const router = express.Router();
const clubsController = require('../controllers/club.controller');

router.param('id_club', function (req, res, next, id_club) {
    req.body.id_club = id_club;
    next();
});

router.route('/')
    .post(function (req, res) {
        clubsController.create(req, res);
    });

router.route('/')
    .get(function (req, res) {
        clubsController.list(req, res);
    });

router.route('/name')
    .get(function (req, res) {
        clubsController.findClub(req, res);
    });

router.route('/:id_club')
    .get(function (req, res) {
        clubsController.findClubID(req, res);
    });

router.route('/update')
    .post(function (req, res) {
        clubsController.update(req, res);
    });

router.route('/')
    .post(function (req, res) {
        clubsController.delete(req, res);
    });
router.route('/eliminar')
    .post(function (req, res) {
        clubsController.delete_club(req, res);
    });

module.exports = router;