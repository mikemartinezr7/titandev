'use strict';

const districtModel = require('../db/models/district.model');

module.exports.create = function(req,res){
    let newDistrict = new districtModel({
        name : req.body.name,
        postalCode: req.body.postalCode
    });

    newDistrict.save(function(error){
        if(error){
            res.json({
                success: false,
                msj : 'El distrito no pudo ser registrado. ' + error
            })
        }else{
            res.json({
                success: true,
                msj : 'El distrito fue registrado de forma exitosa.'
            });
        }
    });
};

module.exports.list = function(req,res){
    districtModel.find().then(
        function(districts){
            res.send(districts);
        }
    );
};