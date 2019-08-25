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

user.idType = user.idType.charAt(0).toUpperCase()+user.idType.slice(1)

switch (user.gender){
    case 'M': user.gender = 'Masculino'; break;
    case 'F': user.gender = 'Femenino'; break;
    case 'O': user.gender = 'Otro'; break;
    case 'P': user.gender = 'Prefiero no decir'; break;
    default: break;
}

if (user.exchange){
    user.exchange = "Sí"
}else{
    user.exchange = "No"
}

let favGenres ='';

for(let i=0;i<user.favoriteGenres.length;i++){
    if(i==user.favoriteGenres.length-1){
        favGenres+=user.favoriteGenres[i]["name"]
    }else{
        favGenres+=user.favoriteGenres[i]["name"]+", "
    }
}

user.favoriteGenres = favGenres

$('#user').empty();
$('#userTemplate').tmpl(user).appendTo('#user');