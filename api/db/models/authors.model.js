'use stric';

const  mongoose = require ('mongoose');

let schema_authors = mongoose.Schema ({

	nombre : { type : String, require : true},
    apellido :  { type : String, require : true},
    nacimiento : { type : Date, require : true},
    biografia  : {type : String, require: true,}

});

module.exports = mongoose.model('Autores', schema_authors)