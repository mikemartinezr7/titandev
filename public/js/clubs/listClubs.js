'use strict';

let list = () => { //servidor
  let clubs = [];

  let request = $.ajax({
    url: "http://localhost:3000/api/club",
    method: "GET",
    data: {
    },
    dataType: "json",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    async : false
  });

  request.done(function (res) {
      clubs = res.clubs_list;
    
  });

  request.fail(function (jqXHR, textStatus) {
    
  });
  return clubs;
 
};


let clubs = list(); //controlador
const table = document.querySelector('#tbl_clubs tbody');

let show_clubs = () => {
    for(let i = 0; i < clubs.length; i++){
       let fila = table.insertRow();

       fila.insertCell().innerHTML = clubs[i]['name'];
       fila.insertCell().innerHTML = clubs[i]['type'];
       fila.insertCell().innerHTML = clubs[i]['genre'];
       fila.insertCell().innerHTML = clubs[i]['startTime'];
       fila.insertCell().innerHTML = clubs[i]['endTime'];
       fila.insertCell().innerHTML = clubs[i]['day'];
       fila.insertCell().innerHTML = clubs[i]['branch'];

       let cell_configuration = fila.insertCell();

        // Creación del botón de editar
        let edit_button = document.createElement('a');
        edit_button.textContent = 'Editar';
        edit_button.href = `updateClub.html?id_club=${clubs[i]['_id']}`;

        cell_configuration.appendChild(edit_button);
    }
};


show_clubs();