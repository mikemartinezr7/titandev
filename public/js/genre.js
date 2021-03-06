'use strict';

const addgenre = document.getElementById('btnAddgenre');
addgenre.addEventListener('click', createGenre);

function isValidData() {
  let isValid = true;

  const name = document.getElementById('name');
  const description = document.getElementById('description');

  if (name.value == '') {
    isValid = false;
    name.classList.add('error');
    swal({
      title:'Error',
      text:"Favor rellene los espacios en blanco",
      type:'fail'
      })
  } else {
    name.classList.remove('error');
  }
  if (description.value == '') {
    isValid = false;
    description.classList.add('error');
    swal({
      title:'Error',
      text:"Favor rellene los espacios en blanco",
      type:'fail'
      })
  } else {
    description.classList.remove('error');
  }


    return isValid;
}

function createGenre(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;

    if(isValidData()){
      let request = $.ajax({
        url: 'http://localhost:3000/api/genre',
        method: 'POST',
        data: {
          name: name,
          description: description
        },
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
      }).done(function (data) {
        console.log('Done' + data.success);
        swal({
          title:'exito',
          text:"Genero y descripcion guardados",
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