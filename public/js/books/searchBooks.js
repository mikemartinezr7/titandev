'use strict';

let search_book = (id_book) => {
    let bookFound = [];
  
    let request = $.ajax({
      url: "http://localhost:3000/api/book"+ id_book,
      method: "GET",
      data: {
      },
      dataType: "json",
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      async : false
    });
  
    request.done(function (res) {
        bookFound = res.bookFound;
      
    });
  
    request.fail(function (jqXHR, textStatus) {
      
    });
    return bookFound;
   
  };
