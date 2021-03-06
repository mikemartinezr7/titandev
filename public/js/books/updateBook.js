'use strict';

//*SERVIDOR**//

let search_book = (id_book) => {
  let book = [];

  let request = $.ajax({
    url: "/api/book/" + id_book,
    method: "GET",
    data: {
    },
    dataType: "json",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    async: false
  });

  request.done(function (res) {
    book = res.book;

  });

  request.fail(function (jqXHR, textStatus) {

  });
  return book;

};

let update_book = (pname, pimage, pgenre, pauthor, pdescription, pyear, peditorial, ptype, planguage, pisbn, pprice, pquantity, pid) => {
  let request = $.ajax({
    url: '/api/book/update',
    method: "POST",
    data: {
      name: pname,
      image: pimage,
      genre: pgenre,
      author: pauthor,
      description: pdescription,
      year: pyear,
      editorial: peditorial,
      type: ptype,
      language: planguage,
      isbn: pisbn,
      price: pprice,
      quantity: pquantity,
      id: pid
    },
    dataType: "json",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  })

  request.done(function (res) {
    swal.fire({
      type: 'success',
      title: 'Libro actualizado correctamente',
      confirmButtonText: 'Entendido' 
    }).then(function(){
      window.location.href="/books/listBooks.html"
    })
  });

  request.fail(function (res) {
    swal.fire({
      type: 'error',
      title: 'No se pudo actualizar el libro',
      confirmButtonText: 'Entendido'
    }).then(function(){
      window.location.href="/books/listBooks.html"
    })
  });
}

//**CONTROLADOR *//

$('#txt_isbn').mask('000-0-00-000000-0', { placeholder: '000-0-00-000000-0' });

const input_name = document.querySelector('#txt_name');
const cover = document.querySelector('#image_preview')
const slt_genre = document.querySelector('#slt_genre');
const input_author = document.querySelector('#txt_author');
const input_description = document.querySelector('#txt_description');
const input_year = document.querySelector('#txt_year');
const input_editorial = document.querySelector('#txt_editorial');
const slt_type = document.querySelector('#slt_type');
const slt_language = document.querySelector('#slt_language');
const input_isbn = document.querySelector('#txt_isbn');
const input_price = document.querySelector('#txt_price');
const input_quantity = document.querySelector('#txt_quantity');
const update_button = document.querySelector('#btn_update');
let btnCancel = document.querySelector('#btnCancel');

btnCancel.addEventListener('click', function () {
  window.location.href = '/books/listBooks.html'
})

let get_param = (param) => {
  var url_string = window.location.href;
  var url = new URL(url_string);
  var id = url.searchParams.get(param);//Toma el parámetro id_book del url y retorna el valor
  return id;
};

let _id = get_param('id_book');

let book = search_book(_id);
let show_book = () => {
  input_name.value = book[0]['name']
  cover.src = book[0]['image']
  input_author.value = book[0]['author']
  input_description.value = book[0]['description']
  input_year.value = book[0]['year']
  input_editorial.value = book[0]['editorial']
  input_isbn.value = book[0]['isbn']
  input_price.value = book[0]['price']
  input_quantity.value = book[0]['quantity']

  let option_genre = document.querySelectorAll('#slt_genre option');
  for (let i = 0; i < option_genre.length; i++) {
    if (option_genre[i].textContent == book[0]['genre']) {
      option_genre[i].selected = true;
    }
  };

  //let option_author = document.querySelectorAll('#slt_author option');

  //for(let i = 0; 1< option_author.length; i++){
  //if(option_author[i].textContent == book[0]['author'] ){
  // option_author[i].selected = true;
  // }
  // };
  let option_type = document.querySelectorAll('#slt_type option');
  for (let i = 0; i < option_type.length; i++) {
    if (option_type[i].textContent == book[0]['type']) {
      option_type[i].selected = true;
    }
  };

  let option_language = document.querySelectorAll('#slt_language option');
  for (let i = 0; i < option_language.length; i++) {
    if (option_language[i].textContent == book[0]['language']) {
      option_language[i].selected = true;
    }
  };
}
if (book) {
  show_book();
}

let get_data = () => {
  let bError = false;
  let name = input_name.value;
  let image = cover.src;
  let genre = slt_genre.selectedOptions[0].textContent;
  let author = input_author.value;
  let description = input_description.value;
  let year = Number(input_year.value);
  let editorial = input_editorial.value;
  let type = slt_type.selectedOptions[0].textContent;
  let language = slt_language.selectedOptions[0].textContent;
  let isbn = input_isbn.value;
  let price = Number(input_price.value);
  let quantity = Number(input_quantity.value);

  bError = validate();

  if (bError == false) {
    update_book(name, image, genre, author, description, year, editorial, type, language, isbn,
      price, quantity, _id);
  } else {
    swal.fire({
      type: 'warning',
      title: 'Información Incompleta',
      text: 'Por favor revise los campos resaltados',
      confirmButtonText: 'Entendido' 
    });
  };
};

function validate() {
  let bError = false;
  let regExpNumeros = /^[0-9]+$/;

  if (input_name.value == '') {
    bError = true;
    input_name.classList.add('error');
  } else {
    input_name.classList.remove('error');
  }

  if (slt_genre.value == '') {
    bError = true;
    slt_genre.classList.add('error');
  } else {
    slt_genre.classList.remove('error');
  }

  if (input_author.value == '') {
    bError = true;
    input_author.classList.add('error');
  } else {
    input_author.classList.remove('error');
  }

  if (input_year.value == '') {
    bError = true;
    input_year.classList.add('error');
  } else {
    input_year.classList.remove('error');
  }

  if (input_editorial.value == '') {
    bError = true;
    input_editorial.classList.add('error');
  } else {
    input_editorial.classList.remove('error');
  }

  if (slt_type.value == '') {
    bError = true;
    slt_type.classList.add('error');
  } else {
    slt_type.classList.remove('error');
  }

  if (slt_language.value == '') {
    bError = true;
    slt_language.classList.add('error');
  } else {
    slt_language.classList.remove('error');
  }

  if (input_isbn.value == '' || regExpNumeros.test(input_price.value) == false || input_isbn.value < 13) {
    bError = true;
    input_isbn.classList.add('error');
  } else {
    input_isbn.classList.remove('error');
  }

  if (input_price.value == '' || regExpNumeros.test(input_price.value) == false) {
    bError = true;
    input_price.classList.add('error');
  } else {
    input_price.classList.remove('error');
  }

  if (input_quantity.value == '' || regExpNumeros.test(input_quantity.value) == false) {
    bError = true;
    input_quantity.classList.add('error');
  } else {
    input_quantity.classList.remove('error');
  }

  return bError;
};

update_button.addEventListener('click', get_data);
