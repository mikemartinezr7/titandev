'use strict';

/*SERVIDOR*/

function list() {
  let clubs = [];
  let search = document.getElementById('txtSearch').value;

  let request = $.ajax({
    url: "/api/club",
    method: "GET",
    data: {
      search_criteria: search
    },
    dataType: "json",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    async: false
  });

  request.done(function (res) {
    clubs = res.clubs_list;
    show_clubs(clubs);
  });
  request.fail(function (jqXHR, textStatus) {
  });
  return clubs;
};

let delete_club = (pid) => {
  let request = $.ajax({
    url: '/api/club/eliminar',
    method: "POST",
    data: {
      id: pid,
    },
    dataType: "json",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  })

  request.done(function (res) {
    swal.fire({
      type: 'success',
      title: 'Club eliminado exitosamente',
      confirmButtonText: 'Entendido'
    }).then(function(){
      window.location.href="/clubs/listClubs.html"
  })
});

  request.fail(function (res) {
    swal.fire({
      type: 'error',
      title: 'No se pudo eliminar el club',
      confirmButtonText: 'Entendido'
    }).then(function(){
      window.location.href="/clubs/listClubs.html"
  })
});
}
let clubs = list(); //controlador

function show_clubs(clubs) {
  const table = document.querySelector('#tbl_clubs tbody');
  table.innerHTML = '';

  for (let i = 0; i < clubs.length; i++) {
    let fila = table.insertRow();

    var link = document.createElement('a');
    var linkText = document.createTextNode(clubs[i]['name']);
    link.appendChild(linkText);
    link.title = clubs[i]['name'];
    link.href = 'viewClub.html?id_club=' + clubs[i]['_id'];

    fila.insertCell().appendChild(link);
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

    //Creación del botón eliminar
    let delete_button = document.createElement('a');
    delete_button.textContent = 'Eliminar';
    delete_button.dataset.id_club = clubs[i]['_id'];
    delete_button.href = '#';

    delete_button.addEventListener('click', function () {
      delete_club(this.dataset.id_club);
    });

    cell_configuration.appendChild(edit_button);
    cell_configuration.appendChild(delete_button);
  }
};

show_clubs(clubs);

let search_button = document.getElementById('btnSearch');
search_button.addEventListener('click', list);