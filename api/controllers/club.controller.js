'use strict';

const club_model = require('../db/models/club.model');

module.exports.create = function(req, res){
    let new_club = new club_model(
        {
            name : req.body.name,
            type : req.body.type,
            genre : req.body.genre,
            startTime : req.body.startTime,
            endTime : req.body.endTime,   
            day : req.body.day,
            branch : req.body.branch
        }
    );
    new_club.save(
        function (error){
            if(error){
                res.json({success: false, msg : 'No se pudo registrar el club de lectura'});
            }else{
                res.json({success: true, msg: 'El club de lectura se registró exitosamente'});
            }
        }
    ); 
};

module.exports.list = function(req, res){
    club_model.find().then(
        function(clubs){
            if(clubs.length > 0){
                res.json({success: true, clubs_list : clubs});
            }else{
                res.json({success: false, clubs_list : clubs});
            }
        }
    );
};

module.exports.findClub = function(req, res){

    let clubName = req.query.name

    club_model.find({name:clubName}, {name: 1, type: 1, branch:1, day: 1, startTime:1, endTime:1, _id:0}).then(
        function(clubs){
            res.send(clubs);
        }
    );
};