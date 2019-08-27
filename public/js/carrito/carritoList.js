'use strict';

//var books = [];

//localStorage.setItem("books", JSON.stringify(books));
//books = JSON.parse(localStorage.getItem("books"));

//var books = [];
//books[0] = prompt("New member name?");
//localStorage.setItem("books", JSON.stringify(books));

//...
//var storedNames = JSON.parse(localStorage.getItem("names"));

/*SERVIDOR*/

function list() {
  let books = [];
  let search = document.getElementById('txtSearch').value;

  let request = $.ajax({
    url: "/api/compras/",
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
    show_compra(books);
  });
  request.fail(function (jqXHR, textStatus) {
  });
  return books;
};

function create_compra(pbooks, pquantity, pdate, psubtotal){
      let request = $.ajax({
          url : '/api/comprar',
          method : "POST",
          data : {
              books : pbooks,
              quantity : pquantity,
              date : pdate,
              subtotal : psubtotal
          },
          dataType : "json",
          contentType : 'application/x-www-form-urlencoded; charset=UTF-8'  
      })
              
      request.done(function(res){
          swal.fire({
              type : 'success',
              title: 'Compra realizada con éxito',
              confirmButtonText: 'Entendido' 
          }).then(function (){
              window.location.href="/carrito/carritoList.html"
          })
      });
  
      request.fail(function(res){
          swal.fire({
              type : 'error',
              title: 'No se pudo completar la compra',
              confirmButtonText: 'Entendido' 
          }).then(function (){
              window.location.href="/carrito/carritoList.html"
          })
      });               
  };

//CONTROLADOR//

function comprar(){
  let bError = false;
  let books = [];
  let date = input_date.value;
  let subtotal = Number(input_subtotal.value);

  bError = validate();

  if(bError == false){
      create_compra(books, quantity, date, subtotal); 
      console.log("Validacion correcta")
  }else{
      swal.fire({
          type : 'warning',
          title: 'Información Incompleta',
          text : 'Por favor revise los campos resaltados',
          confirmButtonText: 'Entendido'
      });
  }
};

function validate(){
  let bError = false;
  //let regExpNumeros = /^[0-9]+$/;

  if(books == ''){
      bError = true;
      books.classList.add('error');
  }else{
      books.classList.remove('error');}

  if(quantity.value == ''){
      bError = true;
      quantity.classList.add('error');
  }else{
      quantity.classList.remove('error');}

  if(date.value == ''){
      bError = true;
      date.classList.add('error');
  }else{
      date.classList.remove('error');}
  
  if(subtotal.value == ''){
      bError = true;
      subtotal.classList.add('error');
  }else{
      subtotal.classList.remove('error');}

  return bError;
};

let compra = list();

function show_compra(compra) {
  const table = document.querySelector('#tbl_compra tbody');
  table.innerHTML = '';

  for (let i = 0; i < compra.length; i++) {
    let fila = table.insertRow();

    fila.insertCell().innerHTML = compra[i]['name'];
    fila.insertCell().innerHTML = compra[i]['genre'];
    fila.insertCell().innerHTML = compra[i]['author'];
    fila.insertCell().innerHTML = compra[i]['editorial'];
    fila.insertCell().innerHTML = compra[i]['type'];
    fila.insertCell().innerHTML = compra[i]['price'];
    fila.insertCell().innerHTML = compra[i]['quantity'];
    fila.insertCell().innerHTML = compra[i]['date'];
    fila.insertCell().innerHTML = compra[i]['subtotal'];
  
}

show_compra(compra);

let search_button = document.getElementById('btnSearch');
search_button.addEventListener('click', list);

}
