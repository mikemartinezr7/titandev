'use strict';

const LibraryModel = require('../db/models/library.model');
const UserModel = require('../db/models/user.model');

const controller = {
  list: function (req, res) {
    console.log(`GET from library Controller`);

    return res.send('get from library controller');
  },

  create: function (req, res) {
    let newLibrary = new LibraryModel({
      commercialName: req.body.txtComercialName,
      brandName: req.body.txtBrandName,
      province: req.body.sltProvince,
      county: req.body.sltCounty,
      district: req.body.sltDistrict,
      address: req.body.txtAddress,
      location: req.body.txtLocation
    });

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
      nickname: req.body.txtFirstName,
      email: req.body.txtEmail,
      password: req.body.txtPassword,
      type: 'library'
    });

    newLibrary.save(function (error, library) {
      if (error) {
        res.status(400).json({
          success: false,
          msg: 'Ha ocurrido un error registrado la libreria. ' + error
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
    });
  }
}

module.exports = controller;