'use strict';

const express = require('express');

const router = express.Router();
const controller = require('../controllers/library.controller');

router.route('/')
  .get(controller.list)
  .post(controller.create);

module.exports = router;