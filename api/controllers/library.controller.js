'use strict';
const path = require('path');

const LibraryModel = require('../db/models/library.model');
const { UserModel } = require('../db/models/user.model');

const controller = {
  list: function (req, res) {
    let searchText = req.query.search;
    let searchCriteria = {};

    if (searchText && searchText != '') {
      searchCriteria = { $or:[
        { commercialName: new RegExp(searchText, 'i') }, 
        { brandName: new RegExp(searchText, 'i') },
        { province: new RegExp(searchText, 'i') },
        { county: new RegExp(searchText, 'i') },
        { district: new RegExp(searchText, 'i') },
        { address: new RegExp(searchText, 'i') },
        { 'admin.firstName': new RegExp(searchText, 'i') },
        { 'admin.middleName': new RegExp(searchText, 'i') },
        { 'admin.firstLastName': new RegExp(searchText, 'i') },
        { 'admin.secondLastName': new RegExp(searchText, 'i') },
      ]};
    }

    LibraryModel.find(searchCriteria, function (error, libraries) {
      if (error) {
        res.status(400).send(error);
      }

      res.status(200).json(libraries);
    });
  },

  create: function (req, res) {
    let newUser = new UserModel({
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      firstLastName: req.body.firstLastName,
      secondLastName: req.body.secondLastName,
      gender: req.body.gender,
      idType: req.body.idType,
      id: req.body.id,
      province: req.body.province,
      county: req.body.county,
      district: req.body.district,
      nickname: req.body.firstName.toLowerCase() + '.' + req.body.firstLastName.toLowerCase() + '.' + req.body.secondLastName.toLowerCase(),
      email: req.body.email,
      password: req.body.password,
      type: 'library'
    });

    let image = '';

    if (req.files) {
      image = req.files.fileImage;
      image.mv(path.join('../public/uploads/libraries/', image.name), function(error) {
        if (error) {
          console.log('error en mv: ', error);
        } else {
          console.log('no error en mv');
        }
      });
    } else {
      image = '';
    }
    
    let newLibrary = new LibraryModel({
      commercialName: req.body.commercialName,
      brandName: req.body.brandName,
      province: req.body.province,
      county: req.body.county,
      district: req.body.district,
      address: req.body.address,
      location: req.body.location,
      image: image.name,
      admin: newUser
    });

    let errors = [];
    let validation = newLibrary.validateSync();

    if (validation) {
      errors = Object.keys(validation.errors).map(function(key, index) {
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
        message : 'Ha ocurrido un error al registrar la librería',
        detail: validation.errors,
        errors: errors
      });
    } else {
      newLibrary.save(function (error, library) {
        if (error) {
          res.status(400).json({
            success: false,
            code: 400,
            message : 'Ha ocurrido un error al registrar la librería',
            detail: error
          });
        } else {
          newUser.save(function(error, user) {
            if (error) {
              res.status(400).json({
                success: false,
                code: 400,
                message : 'Ha ocurrido un error al registrar el usuario de la librería',
                detail: error
              });
            } else {
              res.status(200).json({
                success: true,
                code: 200,
                message : 'Librería registrada correctamente',
                detail: user
              });
            }
          });
        }
      });
    }
  }
}

module.exports = controller;