'use strict';

const { ProvinceModel } = require('../db/models/province.model');

module.exports.create = function (req, res) {
  let newProvince = new ProvinceModel({
    name: req.body.name,
    counties: req.body.counties
  });

  newProvince.save(function (error) {
    if (error) {
      res.json({
        success: false,
        msj: 'La provincia no pudo ser registrada. ' + error
      })
    } else {
      res.json({
        success: true,
        msj: 'La provincia fue registrada de forma exitosa.'
      });
    }
  });
};

module.exports.list = function (req, res) {
  ProvinceModel.find().then(function (provinces) {
    res.send(provinces);
  });
};