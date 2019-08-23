'use strict';

const express = require('express');
const router = express.Router();
const controller_authors = require('../controllers/author.controller');

router.route('/')
  .post(function (req, res){
      controller_authors.create(req, res);
    }

  );

router.route('/')
  .get(function (req, res) {
      controller_authors.list(req, res);
    }
  );

module.exports = router;