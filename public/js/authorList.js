'use strict';

const authorList = getAuthor();

function getAuthor() {
  let authorList = "";
  let request = $.ajax({
    url: 'http://localhost:3000/api/author',
    type: 'get',
    contentType: 'application/x-www-form-urlencoded; charset=utf-8',
    dataType: 'json',
    async: false,
    data: {
    }
  });

  request.done(function (response) {
    authorList = response;
  });

  request.fail(function (error) {
    console.log('Error al cargar datos de autores. ' + error);
  });

  return authorList;
};