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
      firstName: req.body.txtFirstName,
      middleName: req.body.txtMiddleName,
      firstLastName: req.body.txtLastName1,
      secondLastName: req.body.txtLastName2,
      gender: req.body.selGender,
      idType: req.body.sltIdType,
      id: req.body.txtId,
      province: req.body.sltProvince,
      county: req.body.sltCounty,
      district: req.body.sltDistrict,
      nickname: req.body.txtFirstName.toLowerCase() + '.' + req.body.txtLastName1.toLowerCase() + '.' + req.body.txtLastName2[0].toLowerCase(),
      email: req.body.txtEmail,
      password: req.body.txtPassword,
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
      commercialName: req.body.txtComercialName,
      brandName: req.body.txtBrandName,
      province: req.body.sltProvince,
      county: req.body.sltCounty,
      district: req.body.sltDistrict,
      address: req.body.txtAddress,
      location: req.body.txtLocation,
      image: image.name,
      admin: newUser
    });

    let validation = newLibrary.validateSync();

    let errors = Object.keys(validation.errors).map(function(key, index) {
      return validation.errors[key].message;
    });

    if (errors && errors.length > 0) {
      res.status(400).json({
        code: 400,
        message : 'Ha ocurrido un error al registrar la libreria',
        detail: validation.errors,
        errors: errors
      });
    }

    /*newLibrary.save(function (error, library) {
      if (error) {
        res.status(400).json({
          success: false,
          msg: 'Ha ocurrido un error registrando la libreria. ' + error
        });
      } else {
        newUser.save(function(error, user) {
          if (error) {
            res.status(400).json({
              success: false,
              msg: 'Ha ocurrido un error registrado la libreria. ' + error
            });
          } else {
            res.status(200).json({
              success: true,
              msg: 'Libreria registrada correctamente'
            });
          }
        });
      }
    });*/
  }
}

module.exports = controller;