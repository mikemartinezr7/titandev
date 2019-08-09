'use strict';

let search_club = (id_club) => {
    let clubFound = [];
  
    let request = $.ajax({
      url: "http://localhost:3000/api/club"+ id_club,
      method: "GET",
      data: {
      },
      dataType: "json",
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      async : false
    });
  
    request.done(function (res) {
        clubFound = res.clubFound;
      
    });
  
    request.fail(function (jqXHR, textStatus) {
      
    });
    return clubFound;
   
  };