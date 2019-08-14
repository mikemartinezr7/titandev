'use strict';

let search_author = (id_author) => { //servidor
    let author = [];
  
    let request = $.ajax({
      url: "http://localhost:3000/api/author/"+id_author,
      method: "GET",
      data: {
          
      },
      dataType: "json",
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      async : false
    });
  
    request.done(function (res) {
        author = res.author;
      
    });
  
    request.fail(function (jqXHR, textStatus) {
      
    });
    return author;

  };

  const input_firstname = document.querySelector('#txt_firstname');
  const input_lastname = document.querySelector('#txt_lastname');
  const input_birthyear = document.querySelector('#txt_birthyear');
  const input_biography = document.querySelector('#txt_biography');

  let get_param = (param) => { //controlador
    var url_string =  window.location.href;
    var url = new URL(url_string);
    var id = url.searchParams.get(param);//Toma el parámetro id_book del url y retorna el valor
    return id;
};

let _id = get_param('id_author');

let author = search_author(_id);
console.log(author)
if(author){
    input_firstname.innerHTML = author[0]['firstname']
    input_lastname.innerHTML = author[0]['lastname']
    input_birthyear.innerHTML = author[0]['birthyear']
    input_biography.innerHTML = author[0]['biography']
    

}
