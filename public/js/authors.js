'use strict';

const submit = document.getElementById('btnSubmit');
submit.addEventListener('click', createAuthors);

function isValidData() {
  let isValid = true;

  const firstname = document.getElementById('firstname');
  const lastname = document.getElementById('lastname');
  const biography = document.getElementById('biography');
  const birthyear = document.getElementById('birthyear'); 

  if (firstname.value == '') {
    isValid = false;
    firstname.classList.add('error');
    swal({
      title:'error',
      text:"Favor rellene los espacios en blanco",
      type:'fail'
      })
  } else {
    firstname.classList.remove('error');
  }

  if (lastname.value == '') {
    isValid = false;
    lastname.classList.add('error');
    swal({
      title:'error',
      text:"Favor rellene los espacios en blanco",
      type:'fail'
      })
  } else {
    lastname.classList.remove('error');
  }

  if (biography.value == '') {
    isValid = false;
    biography.classList.add('error');
    swal({
      title:'error',
      text:"Favor rellene los espacios en blanco",
      type:'fail'
      })
  } else {
    biography.classList.remove('error');
  }
  if (birthyear.value == '') {
    isValid = false;
    birthyear.classList.add('error');
    swal({
      title:'error',
      text:"Favor rellene los espacios en blanco",
      type:'fail'
      })
  } else {
    birthyear.classList.remove('error');
  }
  return isValid;
}

function createAuthors(event) {
  event.preventDefault();

  const firstname = document.getElementById('firstname').value;
  const lastname = document.getElementById('lastname').value;
  const biography = document.getElementById('biography').value;
  const birthyear = document.getElementById('birthyear').value;


    if(isValidData()){
      let request = $.ajax({
        url: 'http://localhost:3000/api/author',
        method: 'POST',
        data: {
          firstname: firstname,
          lastname: lastname,
          biography: biography,
          birthyear: birthyear
        },
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
      }).done(function (data) {
        console.log('Done' + data.success);
        swal({
          title:'exito',
          text:"Author guardado",
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




