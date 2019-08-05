'use stric';

const  mongoose = require ('mongoose');

let schema_authors = mongoose.Schema ({

	firstname : { type : String, require : true},
    lastname :  { type : String, require : true},
    birthyear : { type : Date, require : true},
    biography  : {type : String, require: true,}

});

module.exports = mongoose.model('Autores', schema_authors)