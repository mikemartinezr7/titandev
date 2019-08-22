'use strict';

function list() {
  let categories = [];
  let search = document.getElementById('txtSearch').value;

  let request = $.ajax({
    url: "http://localhost:3000/api/category",
    method: "GET",
    data: {
      search_criteria: search
    },
    dataType: "json",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    async: false
  });

  request.done(function (res) {
    categories = res.categories_list;
    show_categories(categories);
  });

  request.fail(function (jqXHR, textStatus) {

  });

  return categories;
};

let categories = list(); //controlador

function show_categories(categories) {
  const table = document.querySelector('#tbl_categories tbody');
  table.innerHTML = '';

  for (let i = 0; i < categories.length; i++) {
    let fila = table.insertRow();

    var link = document.createElement('a');
    var linkText = document.createTextNode(categories[i]['categoryname']);
    link.appendChild(linkText);
    fila.insertCell().innerHTML = categories[i]['categoryname'];
    fila.insertCell().innerHTML = categories[i]['details'];

  }
  
}; 

show_categories(categories);

let search_button = document.getElementById('btnSearch');
search_button.addEventListener('click', list, false);