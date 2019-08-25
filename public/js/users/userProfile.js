'use strict';

function getUser() {
    let user = "";
    let request = $.ajax({
      url: '/api/user/session',
      type: 'get',
      contentType: 'application/x-www-form-urlencoded; charset=utf-8',
      dataType: 'json',
      async: false,
      data: {
      }
    });
  
    request.done(function (response) {
      user = response;
    });
  
    request.fail(function (error) {
      console.log('Error al cargar usuario. ' + error);
    });
  
    return user;
  };

let user = getUser();

console.log(user)

if (user.exchange){
    user.exchange = "Sí"
}else{
    user.exchange = "No"
}

$('#user').empty();
$('#userTemplate').tmpl(user).appendTo('#user');