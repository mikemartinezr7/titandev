'use strict';

const express = require('express');

const router = express.Router();
const controller = require('../controllers/library.controller');

router.route('/')
  .get(controller.list)
  .post(controller.create);

router.route('/:id')
  .get(controller.detail);

module.exports = router;