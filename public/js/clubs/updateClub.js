'use strict';

let get_param = (param) => {
    var url_string =  window.location.href;
    var url = new URL(url_string);
    var id = url.searchParams.get(param);//Toma el parámetro id_club del url y retorna el valor
    return id;
};

let _id = get_param('id_club');

console.log(_id);