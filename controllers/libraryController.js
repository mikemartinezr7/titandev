'use strict';

const express = require('express');
const Library = require('../models/libraries');

const routes = function() {
    libraryRouter.route('/')
        .get(function(req, res) {
            res.send('This is /api/library/');
        });
        
    return libraryRouter;
}

module.exports = routes;