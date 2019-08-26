'use strict';

const express = require('express');
const router = express.Router();
const usersController = require('../controllers/user.controller');

router.route('/')
  .post(function (req, res) {
    usersController.create(req, res);
  });

router.route('/')
  .get(function (req, res) {
    usersController.list(req, res);
  });

router.route('/')
  .put(function (req, res) {
    usersController.update(req, res);
  });

router.route('/password')
  .get(function (req, res) {
    usersController.get_password(req, res);
  });

router.route('/activate')
  .post(function (req, res) {
    usersController.activate(req, res);
  });

router.route('/pwdrecovery')
  .post(function (req, res) {
    usersController.pwdrecovery(req, res);
  });

router.route('/pwdrecoveryemail')
  .post(function (req, res) {
    usersController.pwdRecoveryEmail(req, res);
  });

router.route('/login')
  .post(function (req, res) {
    usersController.login(req, res);
  });

router.route('/logout')
  .get(function (req, res) {
    usersController.logout(req, res);
  });

router.route('/session')
  .get(function (req, res) {
    usersController.checkSession(req, res);
  });

router.route('/password')
  .post(function (req, res) {
    usersController.save_password(req, res);
  });

router.route('/randomToken')
  .get(function (req, res) {
    usersController.get_token(req, res);
  });

router.route('/branches')
  .post(function (req,res){
    usersController.addBranch(req,res)
  })

  router.route('/branches')
  .delete(function (req,res){
    usersController.removeBranch(req,res)
  })

module.exports = router;