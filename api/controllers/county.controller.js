'use strict';

const countyModel = require('../db/models/county.model');

module.exports.create = function(req,res){
    let newCounty = new countyModel({
        name : req.body.name,
        districts : req.body.districts
    });

    newCounty.save(function(error){
        if(error){
            res.json({
                success: false,
                msj : 'El cantón no pudo ser registrado. ' + error
            })
        }else{
            res.json({
                success: true,
                msj : 'El cantón fue registrado de forma exitosa.'
            });
        }
    });
};

module.exports.list = function(req,res){
    countyModel.find().populate('districts','name').then(
        function(counties){
            res.send(counties);
        }
    );
};