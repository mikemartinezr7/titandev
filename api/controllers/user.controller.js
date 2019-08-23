'use strict';

const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const { UserModel } = require('../db/models/user.model');

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'info.titandev@gmail.com',
    pass: 'cenfotec123'
  }
});


module.exports.create = function (req, res) {
  let newUser = new UserModel({
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    firstLastName: req.body.firstLastName,
    secondLastName: req.body.secondLastName,
    gender: req.body.gender,
    id: req.body.id,
    idType: req.body.idType,
    province: req.body.province,
    county: req.body.county,
    district: req.body.district,
    additionalDetails: req.body.additionalDetails,
    favoriteGenres: req.body.favoriteGenres,
    favoriteBook: req.body.favoriteBook,
    favoriteAuthor: req.body.favoriteAuthor,
    email: req.body.email,
    avatar: req.body.avatar,
    nickname: req.body.nickname,
    type: req.body.type,
    exchange: req.body.exchange,
    active: false,
  });

  newUser.save(function (error, user) {
    if (error) {
      res.status(400).json({
        success: fase,
        code: 400,
        message: 'Ocurrió un error al registrar el usuario.',
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
      console.log();

      //Send email to registered user
      sendEmail(user.email, '[TitanBooks] Confirmación de cuenta', message);

      res.status(200).json({
        success: true,
        code: 200,
        message: 'El usuario fue registrado exitosamente',
        detail: user
      });
    }
  });
};

module.exports.list = function (req, res) {
  UserModel.find().populate('favoriteGenres', 'name').then(
    function (users) {
      res.send(users);
    }
  );
};

module.exports.get_password = function (req, res) {
  let userEmail = req.query.email;

  UserModel.find({ email: userEmail }, { password: 1, _id: 0 }).then(
    function (users) {
      res.send(users);
    }
  )
}

module.exports.save_password = function (req, res) {
  let userEmail = req.body.email;
  let newPassword = req.body.password

  UserModel.updateOne({ email: userEmail }, { password: newPassword }).then(
    function (error) {
      if (error != "[object Object]") {
        console.log(error)
        res.json({
          success: false,
          msj: 'La contraseña no pudo ser registrada. ' + error
        })
      } else {
        res.json({
          success: true,
          msj: 'La contraseña fue registrada exitosamente.'
        });
      }
    });
}

module.exports.activate = function (req, res) {
  let email = req.body.email;
  let token = req.body.randomToken;
  let pass = req.body.password;
  let passConfirm = req.body.passConfirm;
  let errors = [];

  //Validate data
  if (email == '') {
    errors.push({
      field: 'email',
      message: 'El campo e-mail es requerido'
    });
  }

  if (token == '') {
    errors.push({
      field: 'randomToken',
      message: 'El campo PIN es requerido'
    });
  }

  if (pass == '') {
    errors.push({
      field: 'password',
      message: 'El campo contraseña es requerido'
    });
  }

  if (passConfirm == '') {
    errors.push({
      field: 'passConfirm',
      message: 'El campo confirmar contraseña es requerido'
    });
  }

  if (pass != passConfirm) {
    errors.push({
      field: 'password',
      message: 'Las contraseñas no coinciden'
    });
  }

  if (errors.length > 0) {
    res.status(400).json(errors);
  } else {
    UserModel.findOne({ email: req.body.email, active: false }, function (error, user) { 
      if (error) {
        console.log(error);
      }

      if (user) {
        if (user.randomToken == token) {
          console.log('PIN OK');
        } else {
          console.log('PIN INVALIDO');
        }
      } else {
        errors.push({
          field: 'email',
          message: 'El email digitado no se encuentra registrado en la base de datos'
        });
        res.status(400).json(errors);
      }
    });
  }
}

module.exports.get_token = function (req, res) {
  let userEmail = req.query.email;

  UserModel.findOne({ email: userEmail }, { randomToken: 1, _id: 0 })
    .then(function (users) {
      res.send(users);
    }
    )
}

function sendEmail(email, subject, message) {
  const messageOptions = {
    from: 'info.titandev@gmail.com',
    to: email,
    subject: subject,
    html: message
  };

  console.log('Enviando correo...');

  transport.sendMail(messageOptions, function (err, info) {
    if (err) {
      console.log(err);
    }
  });
}