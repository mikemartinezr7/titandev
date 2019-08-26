'use strict';
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
const appConfig = require('../../config/config.json');

const { BranchModel } = require('../db/models/branch.model');
const { LibraryModel } = require('../db/models/library.model');

const controller = {
  list: function (req, res) {
    BranchModel.find({}, function (error, branches) {
      if (error) {
        res.status(400).send(error);
      }

      res.status(200).json(branches);
    });
  },

  create: function (req, res) {
    let newBranch = new BranchModel({
      library: req.params.id,
      name: req.body.name,
      province: req.body.province,
      county: req.body.county,
      district: req.body.district,
      address: req.body.address,
      location: req.body.location,
      email: req.body.email,
      phone: req.body.phone
    });

    let errors = [];
    let validation = newBranch.validateSync();

    if (validation) {
      errors = Object.keys(validation.errors).map(function (key, index) {
        return {
          field: validation.errors[key].path,
          message: validation.errors[key].message
        }
      });
    }

    if (errors && errors.length > 0) {
      res.status(400).json({
        success: false,
        code: 400,
        message: 'Ha ocurrido un error al registrar la sucursal',
        detail: validation.errors,
        errors: errors
      });
    } else {
      newBranch.save(function (error, branch) {
        if (error) {
          res.status(400).json({
            success: false,
            code: 400,
            message: 'Ha ocurrido un error al registrar la sucursal',
            detail: error
          });
        } else {
          LibraryModel.findByIdAndUpdate(req.params.id, { $push: { branches: branch } }, function (error, libraryUpdated) {
            if (error) throw error;
          });

          res.status(200).json({
            success: true,
            code: 200,
            message: 'Sucursal registrada correctamente',
            detail: branch
          });
        }
      });
    }
  },

  detail: function (req, res) {
    /*LibraryModel.findOne({ _id: req.params.id }, function (error, library) {
      if (error) {
        res.status(400).json({
          success: false,
          code: 400,
          message: 'Ha ocurrido un error al obtener la librería seleccionada',
          detail: error
        });
      }

      if (library) {
        res.status(200).json(library);
      }

      res.end();
    });*/
  }
}

module.exports = controller;