'use strict';

const express = require('express');
const Library = require('../db/models/libraries');
const router = express.Router();

router.route('/')
    .get(function(req, res) {
        res.send('This is /api/library/');
    });

module.exports = router;