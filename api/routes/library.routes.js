'use strict';

const express = require('express');

const router = express.Router();
const libraryController = require('../controllers/library.controller');
const branchController = require('../controllers/branch.controller');

router.route('/')
  .get(libraryController.list)
  .post(libraryController.create);

router.route('/:id')
  .get(libraryController.detail)
  .put(libraryController.edit);

router.route('/:id/branch')
  .get(branchController.list)
  .post(branchController.create);

router.route('/:id/branch/:id')
  .get(branchController.detail);

module.exports = router;