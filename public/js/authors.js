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

  if (biography.value == '') {
    isValid = false;
    biography.classList.add('error');
  } else {
    biography.classList.remove('error');
  }
  if (birthyear.value == '') {
    isValid = false;
    birthyear.classList.add('error');
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

let list_authors = () => { //controlador
  let author = [];
  let request = $.ajax({
    url: "http://localhost:3000/api/book",
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

let search_authors = (id_autor) => {
  let authorFound = [];

  let request = $.ajax({
    url: "http://localhost:3000/api/authors"+ id_autor,
    method: "GET",
    data: {
    },
    dataType: "json",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    async : false
  });

  request.done(function (res) {
      authorFound = res.authorFound;
    
  });

  request.fail(function (jqXHR, textStatus) {
    
  });
  return authorFound;
 
};

