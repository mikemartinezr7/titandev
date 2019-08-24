'use strict';

let search_club = (id_club) => { //servidor
    let club = [];
  
    let request = $.ajax({
      url: "/api/club/"+ id_club,
      method: "GET",
      data: {
          
      },
      dataType: "json",
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      async : false
    });
  
    request.done(function (res) {
        club = res.club;
      
    });
  
    request.fail(function (jqXHR, textStatus) {
      
    });
    return club;
   
  };

const register_button = document.querySelector('#btn_register');
const input_name = document.querySelector('#txt_name');
const slt_type = document.querySelector('#slt_type');
const slt_genre = document.querySelector('#slt_genre');
const slt_startTime = document.querySelector('#slt_startTime');
const slt_endTime = document.querySelector('#slt_endTime');
const slt_day = document.querySelector('#slt_day');
const input_branch = document.querySelector('#txt_branch');

let get_param = (param) => { //controlador
    var url_string =  window.location.href;
    var url = new URL(url_string);
    var id = url.searchParams.get(param);//Toma el parámetro id_book del url y retorna el valor
    return id;
};

let _id = get_param('id_club');

let club = search_club(_id);
console.log(club)
if(club){
    input_name.innerHTML = club[0]['name']
    slt_type.innerHTML = club[0]['type']
    slt_genre.innerHTML = club[0]['genre']
    slt_startTime.innerHTML = club[0]['startTime']
    slt_endTime.innerHTML = club[0]['endTime']
    slt_day.innerHTML = club[0]['day']
    input_branch.innerHTML = club[0]['branch']
}
