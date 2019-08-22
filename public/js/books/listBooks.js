'use strict';

//*SERVIDOR**//

function list() {
  let books = [];
  let search = document.getElementById('txtSearch').value;

  let request = $.ajax({
    url: "/api/book",
    method: "GET",
    data: {
      search_criteria: search
    },
    dataType: "json",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    async: false
  });

  request.done(function (res) {
    books = res.books_list;
    show_books(books);
  });

  request.fail(function (jqXHR, textStatus) {

  });

  return books;
};

let books = list(); //controlador

function show_books(books) {
  const table = document.querySelector('#tbl_books tbody');
  table.innerHTML = '';

  for (let i = 0; i < books.length; i++) {
    let fila = table.insertRow();

    var link = document.createElement('a');
    var linkText = document.createTextNode(books[i]['name']);
    link.appendChild(linkText);
    link.title = books[i]['name'];
    link.href = 'viewBook.html?id_book=' + books[i]['_id'];

    fila.insertCell().appendChild(link);
    //fila.insertCell().src = books[i]['image'];
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

   let cover = document.createElement('img');
            cover.classList.add('imageTable');
            if (books[i]['image']) {
                cover.src = books[i]['image'];
            } else {
               cover.src = '../img/book-placeholder.png';
            }

            cell_configuration.appendChild(cover);
    
            let cellDelete = fila.insertCell
            let linkDelete = document.createElement('a');
            linkDelete.href = '#';
            linkDelete.innerText = 'Eliminar';

            linkDelete.addEventListener('click', function() {
                deleteBook(books_list[i]['_id']);
                window.location.href = 'listBooks.html';
            });

            cellDelete.appendChild(linkDelete);

    // Creación del botón de editar
    let edit_button = document.createElement('a');
    edit_button.textContent = 'Editar';
    edit_button.href = `updateBook.html?id_book=${books[i]['_id']}`;

    cell_configuration.appendChild(edit_button);
  }
};

show_books(books);

let search_button = document.getElementById('btnSearch');
search_button.addEventListener('click', list);

