'use strict';

let list = () => { //servidor
  let books = [];

  let request = $.ajax({
    url: "http://localhost:3000/api/book",
    method: "GET",
    data: {
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
  return books;
 
};


let books = list(); //controlador
const table = document.querySelector('#tbl_books tbody');

let show_books = () => {
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

