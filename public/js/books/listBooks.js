'use strict';

let list = () => { //servidor
  let books = [];
  let search = document.getElementById('txtSearch').value;

  let request = $.ajax({
    url: "/api/book",
    method: "GET",
    data: {
      search_criteria:search
    },
    dataType: "json",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    async : false
  });

  request.done(function (res) {
      books = res.books_list;
     
  });

  request.fail(function (jqXHR, textStatus) {
    
  });
  console.log(books);
  return books;
};

let search = () => { //servidor
  let books = [];
  let search = document.getElementById('txtSearch').value;

  let request = $.ajax({
    url: "/api/book",
    method: "GET",
    data: {
      search_criteria:search
    },
    dataType: "json",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    async : false
  });

  request.done(function (res) {
      books = res.books_list;
     
  });

  request.fail(function (jqXHR, textStatus) {
    
  });
  console.log(books);
  return books;
};


var books = list(); //controlador
const table = document.querySelector('#tbl_books tbody');

let show_books = () => {
  console.log('show_books');
    for(let i = 0; i < books.length; i++){
       let fila = table.insertRow();

       fila.insertCell().innerHTML = books[i]['name'];
       fila.insertCell().innerHTML = books[i]['image'];
       fila.insertCell().innerHTML = books[i]['genre'];
       fila.insertCell().innerHTML = books[i]['author'];
       fila.insertCell().innerHTML = books[i]['description'];
       fila.insertCell().innerHTML = books[i]['year'];
       fila.insertCell().innerHTML = books[i]['editorial'];
       fila.insertCell().innerHTML = books[i]['type'];
       fila.insertCell().innerHTML = books[i]['language'];
       fila.insertCell().innerHTML = books[i]['isbn'];
       fila.insertCell().innerHTML = books[i]['price'];
       fila.insertCell().innerHTML = books[i]['quantity'];

       let cell_configuration = fila.insertCell();

        // Creación del botón de editar
        let edit_button = document.createElement('a');
        edit_button.textContent = 'Editar';
        edit_button.href = `updateBook.html?id_book=${books[i]['_id']}`;

        cell_configuration.appendChild(edit_button);
    }
};

show_books();

let search_button = document.getElementById('btnSearch');
search_button.addEventListener('click', search);

