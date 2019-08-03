'use strict';

const genreModel = require('../db/models/genre.model');

module.exports.create = function(req,res){
    let newGenre = new genreModel({
        name : req.body.name
    });

    newGenre.save(function(error){
        if(error){
            res.json({
                success: false,
                msj : 'El género no pudo ser registrado. ' + error
            })
        }else{
            res.json({
                success: true,
                msj : 'El género fue registrado de forma exitosa.'
            });
        }
    });
};

module.exports.list = function(req,res){
    genreModel.find().then(
        function(genres){
            res.send(genres);
        }
    );
};