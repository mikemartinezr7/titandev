'use strict';

function list() {
  let authors = [];
  let search = document.getElementById('txtSearch').value;

  let request = $.ajax({
    url: "http://localhost:3000/api/author",
    method: "GET",
    data: {
      search_criteria: search
    },
    dataType: "json",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    async: false
  });

  request.done(function (res) {
    authors = res.authors_list;
    show_authors(authors);
  });

  request.fail(function (jqXHR, textStatus) {

  });

  return authors;
};

let authors = list(); //controlador

function show_authors(authors) {
  const table = document.querySelector('#tbl_authors tbody');
  table.innerHTML = '';

  for (let i = 0; i < authors.length; i++) {
    let fila = table.insertRow();

    var link = document.createElement('a');
    var linkText = document.createTextNode(authors[i]['firstname']);
    link.appendChild(linkText);
    link.title = authors[i]['firstname'];
    link.href = 'authorsview.html?id=' + authors[i]['_id'];

    fila.insertCell().appendChild(link);
    fila.insertCell().innerHTML = authors[i]['firstname'];
    fila.insertCell().innerHTML = authors[i]['lastname'];
    fila.insertCell().innerHTML = authors[i]['birthyear'];
    fila.insertCell().innerHTML = authors[i]['deathyear'];
    fila.insertCell().innerHTML = authors[i]['nationality'];
    fila.insertCell().innerHTML = authors[i]['biography'];
    fila.insertCell().innerHTML = authors[i]['authorpic'];

    let cell_configuration = fila.insertCell();

    // Creación del botón de editar
    let edit_button = document.createElement('a');
    edit_button.textContent = 'ver perfil';
    edit_button.href = `authorsview.html?id_author=${authors[i]['_id']}`;

    cell_configuration.appendChild(edit_button);
  }
  
}; 

show_authors(authors);

let search_button = document.getElementById('btnSearch');
search_button.addEventListener('click', list, false);
