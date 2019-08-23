'use strict';

const Addcategory = document.getElementById('btnAddcategory');
Addcategory.addEventListener('click', createCategory);

function isValidData() {
  let isValid = true;

  const categoryname = document.getElementById('categoryname');
  const details = document.getElementById('details');

  if (categoryname.value == '') {
    isValid = false;
    categoryname.classList.add('error');
    swal({
      title:'Error',
      text:"Favor rellene los espacios en blanco",
      type:'fail'
      })
  } else {
    categoryname.classList.remove('error');
  }

  if (details.value == '') {
    isValid = false;
    details.classList.add('error');
    swal({
      title:'Error',
      text:"Favor rellene los espacios en blanco",
      type:'fail'
      })
  } else {
    details.classList.remove('error');
  }
  
  

  return isValid;
}

function createCategory(event) {
  event.preventDefault();

  const categoryname = document.getElementById('categoryname').value;
  const details = document.getElementById('details').value;

    if(isValidData()){
      let request = $.ajax({
        url: 'http://localhost:3000/api/category',
        method: 'POST',
        data: {
          categoryname: categoryname,
          details: details
        },
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
      }).done(function (data) {
        console.log('Done' + data.success);
        swal({
          title:'exito',
          text:"Categoria agregada",
          type:'success'
          }).then(function() {
            window.location = "../index.html";
        })

      }).fail(function (error) {
        console.log('Fail ' + error);
      });
      
} else {
  console.log('Error sus datos son invalidos');
}
}