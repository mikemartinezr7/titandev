'use strict';

let search_book = (id_book) => { //servidor
    let book = [];
  
    let request = $.ajax({
      url: "/api/book/"+ id_book,
      method: "GET",
      data: {
          
      },
      dataType: "json",
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      async : false
    });
  
    request.done(function (res) {
        book = res.book;
      
    });
  
    request.fail(function (jqXHR, textStatus) {
      
    });
    return book;
   
  };

//const register_button = document.querySelector('#btn_register');
const input_name = document.querySelector('#txt_name');
const cover = document.querySelector('#image_preview')
const slt_genre = document.querySelector('#slt_genre');
const input_author = document.querySelector('#txt_author');
var input_description = document.querySelector('#txt_description');
const input_year = document.querySelector('#txt_year');
const input_editorial = document.querySelector('#txt_editorial');
const slt_type = document.querySelector('#slt_type');
const slt_language = document.querySelector('#slt_language');
const input_isbn = document.querySelector('#txt_isbn');
const input_price = document.querySelector('#txt_price');
const input_quantity = document.querySelector('#txt_quantity');

let get_param = (param) => { //controlador
    var url_string =  window.location.href;
    var url = new URL(url_string);
    var id = url.searchParams.get(param);//Toma el parámetro id_book del url y retorna el valor
    return id;
};

let _id = get_param('id_book');

let book = search_book(_id);
console.log(book)
if(book){
    input_name.innerHTML = book[0]['name']
    cover.src = book[0]['image']
    slt_genre.innerHTML = book[0]['genre']
    input_author.innerHTML = book[0]['author']
    input_description.innerHTML = book[0]['description']
    input_year.innerHTML = book[0]['year']
    input_editorial.innerHTML = book[0]['editorial']
    slt_type.innerHTML = book[0]['type']
    slt_language.innerHTML = book[0]['language']
    input_isbn.innerHTML = book[0]['isbn']
    input_price.innerHTML = book[0]['price']
    input_quantity.innerHTML = book[0]['quantity']

}

