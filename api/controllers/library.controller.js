'use strict';
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
const appConfig = require('../../config/config.json');

const { LibraryModel } = require('../db/models/library.model');
const { UserModel } = require('../db/models/user.model');

const transport = nodemailer.createTransport({
  service: appConfig.email.service,
  auth: {
    user: appConfig.email.user,
    pass: appConfig.email.password
  }
});

const controller = {
  list: function (req, res) {
    let searchText = req.query.search;
    let searchCriteria = { active: true };

    if (searchText && searchText != '') {
      searchCriteria = { active: true , $or:[
        { commercialName: new RegExp(searchText, 'i') }, 
        { brandName: new RegExp(searchText, 'i') },
        { province: new RegExp(searchText, 'i') },
        { county: new RegExp(searchText, 'i') },
        { district: new RegExp(searchText, 'i') },
        { address: new RegExp(searchText, 'i') },
        { 'admin.firstName': new RegExp(searchText, 'i') },
        { 'admin.middleName': new RegExp(searchText, 'i') },
        { 'admin.firstLastName': new RegExp(searchText, 'i') },
        { 'admin.secondLastName': new RegExp(searchText, 'i') }
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
      birthDate: req.body.birthDate,
      id: req.body.id,
      province: req.body.province,
      county: req.body.county,
      district: req.body.district,
      nickname: req.body.firstName + '.' + req.body.firstLastName + '.' + req.body.secondLastName,
      email: req.body.email,
      password: req.body.password,
      type: 'library',
      active: true
    });

    let image = '';
    
    let newLibrary = new LibraryModel({
      commercialName: req.body.commercialName,
      brandName: req.body.brandName,
      province: req.body.province,
      county: req.body.county,
      district: req.body.district,
      address: req.body.address,
      location: req.body.location,
      image: req.body.image,
      admin: newUser,
      branches: []
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
              let templatePath = path.join(appRoot, '/public/users/template.html');
              let templateContent = fs.readFileSync(templatePath, { 'encoding': 'utf8' });
              let message = templateContent;
              let url = req.protocol + '://' + req.get('host') + '/users/activate.html';

              message = message.replace('##EMAIL##', user.email);
              message = message.replace('##PIN##', user.randomToken);
              message = message.replace(/##URL##/g, url);

              //Send email to registered user
              sendEmail(user.email, '[TitanBooks] Confirmación de cuenta', message);

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
  },

  edit: function (req, res) {
    let userInfoUpdated = { 
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      firstLastName: req.body.firstLastName,
      secondLastName: req.body.secondLastName,
      gender: req.body.gender,
      idType: req.body.idType,
      birthDate: req.body.birthDate,
      id: req.body.id,
      province: req.body.province,
      county: req.body.county,
      district: req.body.district,
      nickname: req.body.firstName + '.' + req.body.firstLastName + '.' + req.body.secondLastName,
      email: req.body.email,
      password: req.body.password,
      type: 'library'
    };

    let libraryInfoUpdated = {
      commercialName: req.body.commercialName,
      brandName: req.body.brandName,
      province: req.body.province,
      county: req.body.county,
      district: req.body.district,
      address: req.body.address,
      location: req.body.location,
      image: req.body.image,
      admin: userInfoUpdated
    };
    
    let updateLibrary = LibraryModel(libraryInfoUpdated);

    let errors = [];
    let validation = updateLibrary.validateSync();

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
      UserModel.findByIdAndUpdate(req.body.userid, userInfoUpdated, { new: true }, function (error, userUpdated) {
        if (error) {
          res.status(400).json({
            success: false,
            code: 400,
            message : 'Ha ocurrido un error al editar la información del usuario de la librería',
            detail: error
          });
        } else {
          LibraryModel.findByIdAndUpdate(req.body._id, libraryInfoUpdated, { new: true }, function (error, libraryUpdated) {
            if (error) {
              res.status(400).json({
                success: false,
                code: 400,
                message : 'Ha ocurrido un error al editar la información de la librería',
                detail: error
              });
            } else {
              res.status(200).json({
                success: true,
                code: 200,
                message : 'Información de librería editada correctamente',
                detail: libraryUpdated
              });
            }
          });
        }
      });
    }
  },

  detail: function (req, res) {
    LibraryModel.findOne({ _id: req.params.id }, function (error, library) { 
      if (error)  {
        res.status(400).json({
          success: false,
          code: 400,
          message : 'Ha ocurrido un error al obtener la librería seleccionada',
          detail: error
        });
      }
  
      if (library) {
        res.status(200).json(library);
      }

      res.end();
    });
  }
}

function sendEmail(email, subject, message) {
  const messageOptions = {
    from: appConfig.email.email,
    to: email,
    subject: subject,
    html: message
  };

  transport.sendMail(messageOptions, function (err, info) {
    if (err) {
      console.log(err);
    }
  });
}

module.exports = controller;