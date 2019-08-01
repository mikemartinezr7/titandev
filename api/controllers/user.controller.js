'use strict';

const userModel = require('../db/models/user.model');

module.exports.create = function(req,res){
    let newUser = new userModel({
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
        favoriteGenre : req.body.favoriteGenre,
        favoriteBook : req.body.favoriteBook,
        favoriteAuthor : req.body.favoriteAuthor,
        email : req.body.email,
        avatarURL : req.body.avatarURL,
        nickname:  req.body.nickname,
        password: req.body.password
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
    userModel.find().populate('favoriteGenre','name').then(
        function(users){
            res.send(users);
        }
    );
};

module.exports.get_password = function(req,res){

    let userEmail = req.query.email;

    userModel.find({email:userEmail},{password: 1, _id: 0}).then(
        function(users){
            res.send(users);
        }
    )
}