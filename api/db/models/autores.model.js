'use stric';

const  mongoose = require ('mongoose');

let schema_autores = mongoose.schema ({

	nombre : { type : string, required : true},
    apellido :  { type : string, required : true},
    nacimiento : { type : Date, required : true},
    biografia  : {type : string, required: true,}

});

module.exports = mongoose.model('Autores', schema_autores)