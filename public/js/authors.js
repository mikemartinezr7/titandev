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
  } else {
    firstname.classList.remove('error');
  }

  if (lastname.value == '') {
    isValid = false;
    lastname.classList.add('error');
  } else {
    lastname.classList.remove('error');
  }

  return isValid;
}

function createAuthors(event) {
  event.preventDefault();

  const firstname = document.getElementById('firstname').value;
  const lastname = document.getElementById('lastname').value;
  const biography = document.getElementById('biography').value;
  const birthyear = document.getElementById('birthyear').value;

  if (isValidData()) {
  let request = $.ajax({
    url: '/api/author',
    method: 'POST',
    data: {
      firstname: firstname,
      lastname: lastname,
      biography: biography,
      birthyear: birthyear
    },
    dataType: 'json',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  }).done(function(data) {
    console.log('Done' + data.success);
  }).fail(function(error) {
    console.log('Fail ' + error);
  });
} else {
  console.log('Erro sus datos son invalidos');
}
}
