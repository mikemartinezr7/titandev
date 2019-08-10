'use strict';

const { UserModel } = require('../db/models/user.model');

module.exports.create = function(req,res){
    let newUser = new UserModel({
        firstName : req.body.firstName,
        middleName : req.body.middleName,
        firstLastName : req.body.firstLastName,
        secondLastName : req.body.secondLastName,
        gender : req.body.gender,
        id : req.body.id,
        province : req.body.province,
        county : req.body.county,
        district : req.body.district,
        additionalDetails : req.body.additionalDetails,
        favoriteGenres : req.body.favoriteGenres,
        favoriteBook : req.body.favoriteBook,
        favoriteAuthor : req.body.favoriteAuthor,
        email : req.body.email,
        avatar : req.body.avatar,
        nickname:  req.body.nickname,
        type: req.body.type,
        exchange: req.body.exchange
    });

    newUser.save(function(error){
        if(error){
            res.json({
                success: false,
                msj : 'El usuario no pudo ser registrado. ' + error
            })
        }else{
            res.json({
                success: true,
                msj : 'El usuario fue registrado de forma exitosa.'
            });
        }
    });
};

module.exports.list = function(req,res){
    UserModel.find().populate('favoriteGenres','name').then(
        function(users){
            res.send(users);
        }
    );
};

module.exports.get_password = function(req,res){

    let userEmail = req.query.email;

    UserModel.find({email:userEmail},{password: 1, _id: 0}).then(
        function(users){
            res.send(users);
        }
    )
}

module.exports.save_password = function(req,res){

    let userEmail = req.body.email;
    let newPassword = req.body.password

    UserModel.updateOne({email:userEmail},{password:newPassword}).then(
        function(error){
            if(error!="[object Object]"){
                console.log(error)
                res.json({
                    success: false,
                    msj : 'La contraseña no pudo ser registrada. ' + error
                })
            }else{
                res.json({
                    success: true,
                    msj : 'La contraseña fue registrada exitosamente.'
                });
            }
        });
}

module.exports.get_token = function(req,res){

    let userEmail = req.query.email;

    UserModel.find({email:userEmail},{randomToken: 1, _id: 0}).then(
        function(users){
            res.send(users);
        }
    )
}