'use stric';

const  mongoose = require ('mongoose');

let AuthorSchema = mongoose.Schema ({
	firstname : { type : String, require : true},
    lastname :  { type : String, require : true},
    birthyear : { type : Date, require : true},
    deathyear : { type : Date, require : true},
    nationality : {type : String, require: true,},
    biography  : {type : String, require: true,},
    authorpic : {type : String, require: true,}

});

module.exports = mongoose.model('Author', AuthorSchema)