'use strict';

const addgenre = document.getElementById('btnAddgenre');
addgenre.addEventListener('click', createGenre);

function isValidData() {
  let isValid = true;

  const name = document.getElementById('name');
  
  if (name.value == '') {
    isValid = false;
    name.classList.add('error');
  } else {
    name.classList.remove('error');
  }


    return isValid;
}

function createGenre(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
 

    if(isValidData()){
      let request = $.ajax({
        url: 'http://localhost:3000/api/genre',
        method: 'POST',
        data: {
          name: name,
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