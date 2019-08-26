'use strict';

const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const appConfig = require('../../config/config.json');
const { UserModel } = require('../db/models/user.model');
const randToken = require('rand-token').generator({ chars: '0-9' });

const transport = nodemailer.createTransport({
  service: appConfig.email.service,
  auth: {
    user: appConfig.email.user,
    pass: appConfig.email.password
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
}

module.exports.list = function (req, res) {

  let searchText = req.query.search;
  let searchCriteria = {};

  if (searchText && searchText != "") {
    searchCriteria = { email: new RegExp(searchText, 'i') }
  }

  UserModel.find(searchCriteria).populate('favoriteGenres', 'name').populate('branches').exec(
    function (error, users) {
      if (error) {
        res.status(400).send(error)
      }
      res.status(200).send(users);
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

module.exports.update = function (req, res) {
  UserModel.findByIdAndUpdate(req.body._id, { $set: req.body }, { new: true }).populate('favoriteGenres', 'name').populate('branches').exec(
    function (error, user) {
      if (error) {
        res.json({ success: false, msg: 'No se pudo actualizar el perfil.' });
        console.log(error)
      } else {
        req.session.user = user
        res.json({ success: true, msg: 'El perfil se actualizó exitosamente' });
      }
    }
  );
};

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
      message: 'El campo e-mail es requerido.'
    });
  }

  if (token == '') {
    errors.push({
      field: 'randomToken',
      message: 'El campo PIN es requerido.'
    });
  }

  if (pass == '') {
    errors.push({
      field: 'password',
      message: 'El campo contraseña es requerido.'
    });
  }

  if (passConfirm == '') {
    errors.push({
      field: 'passConfirm',
      message: 'El campo confirmar contraseña es requerido.'
    });
  }

  if (pass != passConfirm) {
    errors.push({
      field: 'password',
      message: 'Las contraseñas no coinciden.'
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
          UserModel.findByIdAndUpdate(user._id, { active: true, password: req.body.password }, function (error, userUpdated) {
            if (error) {
              errors.push({
                field: 'email',
                message: 'Ha ocurrido un error al activar el usuario. Vuelvalo a intentarlo en unos minutos.',
                detail: error
              });
              res.status(400).json(errors);
            } else {
              res.status(200).json({
                success: true,
                code: 200,
                message: 'El usuario fue activado exitosamente.',
                detail: userUpdated
              });
            }
          });
        } else {
          errors.push({
            field: 'randomToken',
            message: 'El PIN digitado no es válido. Revisa el PIN enviado al email y vuelvalo a digitar correctamente.'
          });
          res.status(400).json(errors);
        }
      } else {
        errors.push({
          field: 'email',
          message: 'El email digitado no se encuentra registrado en la base de datos.'
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

module.exports.login = function (req, res) {
  let errors = [];

  //Validate data
  if (req.body.email == '') {
    errors.push({
      field: 'email',
      message: 'El campo e-mail es requerido.'
    });
  }

  if (req.body.password == '') {
    errors.push({
      field: 'password',
      message: 'El campo contraseña es requerido.'
    });
  }

  if (errors.length > 0) {
    res.status(400).json(errors);
  } else {
    UserModel.findOne({ email: req.body.email, password: req.body.password, active: true }).populate('favoriteGenres', 'name').populate('branches').exec(function (error, user) {
      if (error) {
        errors.push({
          field: 'email',
          message: 'Ha ocurrido un error al Iniciar Sesión. Vuelvalo a intentarlo en unos minutos.',
          detail: error
        });

        res.status(400).json(errors);
      }

      if (user) {
        req.session.user = user;

        res.status(200).json({
          success: true,
          code: 200,
          message: 'Inicio de sesión satisfactorio',
        });
      } else {
        errors.push({
          field: 'email',
          message: 'El usuario o contraseña son incorrectos.',
          detail: error
        });

        res.status(400).json(errors);
      }
    });
  }
}

module.exports.logout = function (req, res) {
  req.session.destroy();

  res.status(200).json({
    success: true,
    code: 200,
    message: 'Cierre de sesión satisfactorio.',
  });
}

module.exports.checkSession = function (req, res) {
  if (req.session && req.session.user) {
    return res.status(200).send(req.session.user);
  } else {
    return res.status(401).send();
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

module.exports.pwdrecovery = function (req, res) {
  let email = req.body.email;
  let token = req.body.randomToken;
  let pass = req.body.password;
  let passConfirm = req.body.passConfirm;
  let errors = [];

  //Validate data
  if (email == '') {
    errors.push({
      field: 'email',
      message: 'El campo e-mail es requerido.'
    });
  }

  if (token == '') {
    errors.push({
      field: 'randomToken',
      message: 'El campo PIN es requerido.'
    });
  }

  if (pass == '') {
    errors.push({
      field: 'password',
      message: 'El campo contraseña es requerido.'
    });
  }

  if (passConfirm == '') {
    errors.push({
      field: 'passConfirm',
      message: 'El campo confirmar contraseña es requerido.'
    });
  }

  if (pass != passConfirm) {
    errors.push({
      field: 'password',
      message: 'Las contraseñas no coinciden.'
    });
  }

  if (errors.length > 0) {
    res.status(400).json(errors);
  } else {
    UserModel.findOne({ email: req.body.email }, function (error, user) {
      if (error) {
        console.log(error);
      }

      if (user) {
        if (user.randomToken == token) {
          UserModel.findByIdAndUpdate(user._id, { password: req.body.password }, function (error, userUpdated) {
            if (error) {
              errors.push({
                field: 'email',
                message: 'Ha ocurrido un error al guardar la contraseña. Vuelvalo a intentarlo en unos minutos.',
                detail: error
              });
              res.status(400).json(errors);
            } else {
              res.status(200).json({
                success: true,
                code: 200,
                message: 'La contraseña fue actualizada correctamente.',
                detail: userUpdated
              });
            }
          });
        } else {
          errors.push({
            field: 'randomToken',
            message: 'El PIN digitado no es válido. Revisa el PIN enviado al email y e inténtalo de nuevo.'
          });
          res.status(400).json(errors);
        }
      } else {
        errors.push({
          field: 'email',
          message: 'El email digitado no se encuentra registrado en la base de datos.'
        });
        res.status(400).json(errors);
      }
    });
  }
}

module.exports.pwdRecoveryEmail = function (req, res) {

  let email = req.body.email;
  let errors = [];

  //Validate data
  if (email == '') {
    errors.push({
      field: 'email',
      message: 'El campo e-mail es requerido.'
    });
  }
  if (errors.length > 0) {
    res.status(400).json(errors);
  } else {
    UserModel.findOne({ email: req.body.email }, function (error, user) {
      if (error) {
        console.log(error);
      }
      if (user) {
        UserModel.findByIdAndUpdate(user._id, { randomToken: randToken.generate(6) }, { new: true }).exec(function (error, userUpdated) {
          if (error) {
            errors.push({
              field: 'email',
              message: 'Ha ocurrido un error. Vuelve a intentarlo en unos minutos.',
              detail: error
            });
            res.status(400).json(errors);
          } else {

            let templatePath = path.join(appRoot, '/public/users/templaterecovery.html');
            let templateContent = fs.readFileSync(templatePath, { 'encoding': 'utf8' });
            let message = templateContent;
            let url = req.protocol + '://' + req.get('host') + '/users/pwdrecovery.html';

            message = message.replace('##EMAIL##', userUpdated.email);
            message = message.replace('##PIN##', userUpdated.randomToken);
            message = message.replace(/##URL##/g, url);

            //Send email to registered user
            sendEmail(user.email, '[TitanBooks] Confirmación de cuenta', message);

            res.status(200).json({
              success: true,
              code: 200,
              message: 'Correo electrónico con PIN ha sido enviado.',
              detail: userUpdated
            });
          }
        });
      } else {
        errors.push({
          field: 'email',
          message: 'El email digitado no se encuentra registrado en la base de datos.'
        });
        res.status(400).json(errors);
      }
    });
  }
}

module.exports.addBranch = function (req, res) {
  let id = req.body._id;
  let branchId = req.body.branchId;
  let errors = [];

  UserModel.updateOne(
    { _id: id },
    { $push: { branches: branchId } }
  ).exec(function (error) {
    if (error) {
      errors.push({
        field: 'email',
        message: 'Ha ocurrido un error. Vuelve a intentarlo en unos minutos.',
        detail: error
      });
      console.log(error)
      res.status(400).json(errors);
    } else {
      UserModel.findOne({ _id: id }).populate('branches').exec(function (error, user) {
        if (error) {
          errors.push({
            field: 'email',
            message: 'Ha ocurrido un error. Vuelve a intentarlo en unos minutos.',
            detail: error
          });
          res.status(400).json(errors);
        } else {
          req.session.user = user
          res.status(200).send(user);
        }
      })
    }
  })
}

module.exports.removeBranch = function (req, res) {
  let id = req.body._id;
  let branchId = req.body.branchId;
  let errors = [];

  UserModel.updateOne(
    { _id: id },
    { $pull: { branches: branchId } }
  ).exec(function (error) {
    if (error) {
      errors.push({
        field: 'email',
        message: 'Ha ocurrido un error. Vuelve a intentarlo en unos minutos.',
        detail: error
      });
      console.log(error)
      res.status(400).json(errors);
    } else {
      UserModel.findOne({ _id: id }).populate('branches').exec(function (error, user) {
        if (error) {
          errors.push({
            field: 'email',
            message: 'Ha ocurrido un error. Vuelve a intentarlo en unos minutos.',
            detail: error
          });
          res.status(400).json(errors);
        } else {
          req.session.user = user
          res.status(200).send(user);
        }
      })
    }
  })
}