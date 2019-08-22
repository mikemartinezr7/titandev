'use strict';

function list() {
  let genres = [];
  let search = document.getElementById('txtSearch').value;

  let request = $.ajax({
    url: "http://localhost:3000/api/genre",
    method: "GET",
    data: {
      search_criteria: search
    },
    dataType: "json",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    async: false
  });

  request.done(function (res) {
    genres = res.genres_list;
    show_genres(genres);
  });

  request.fail(function (jqXHR, textStatus) {

  });

  return genres;
};

let genres = list(); //controlador

function show_genres(genres) {
  const table = document.querySelector('#tbl_genres tbody');
  table.innerHTML = '';

  for (let i = 0; i < genres.length; i++) {
    let fila = table.insertRow();

    var link = document.createElement('a');
    var linkText = document.createTextNode(genres[i]['name']);
    
    fila.insertCell().innerHTML = genres[i]['name'];
  

    let cell_configuration = fila.insertCell();


  }
  
}; 

show_genres(genres);

let search_button = document.getElementById('btnSearch');
search_button.addEventListener('click', list, false);