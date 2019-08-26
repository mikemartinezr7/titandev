'use strict';

$('#idType').change(function () {
  switch ($(this).val()) {
    case 'nacional': $('#txtID').mask('0-0000-0000', { placeholder: '0-0000-0000' }); break;
    case 'residente': $('#txtID').mask('0-000-000000', { placeholder: '0-000-000000' }); break;
    case 'nacionalizado': $('#txtID').mask('0-0000-0000', { placeholder: '0-0000-0000' }); break;
    case 'extranjero': $('#txtID').mask('000000000000', { placeholder: '000000000000' }); break;
    default: break;
  }
});

let inputFirstName = document.querySelector('#txtFirstName');
let inputMiddleName = document.querySelector('#txtMiddleName');
let inputLastName = document.querySelector('#txtLastName');
let inputSecondLastName = document.querySelector('#txtSecondLastName');
let inputIDType = document.querySelector('#idType');
let inputID = document.querySelector('#txtID');
var inputEmail = document.querySelector('#txtEmail');
let inputAdditionalDetails = document.querySelector('#txtAdditionalDetails');
let inputFavoriteBook = document.querySelector('#txtFavoriteBook');
let inputFavoriteAuthor = document.querySelector('#txtFavoriteAuthor');
let inputNickname = document.querySelector('#txtNickname');
let inputAvatar = document.querySelector('#image_preview');
let inputExchange = document.querySelector('#Exchange');
let btnCancel = document.querySelector('#btnCancel');
let sltGender = document.querySelector('#sltGender');
let sltidType = document.querySelector('#idType')

btnCancel.addEventListener('click', function () {
  window.location.href = '/users/profile.html'
})

function getUser() {
  let user = "";
  let request = $.ajax({
    url: '/api/user/session',
    type: 'get',
    contentType: 'application/x-www-form-urlencoded; charset=utf-8',
    dataType: 'json',
    async: false,
    data: {
    }
  });

  request.done(function (response) {
    user = response;
  });

  request.fail(function (error) {
    console.log('Error al cargar usuario. ' + error);
  });

  return user;
};

let user = getUser();

inputFirstName.value = user.firstName
inputMiddleName.value = user.middleName
inputLastName.value = user.firstLastName
inputSecondLastName.value = user.secondLastName
inputEmail.value = user.email
inputNickname.value = user.nickname
inputID.value = user.id
inputAvatar.src = user.avatar

let option_gender = document.querySelectorAll('#sltGender option');
for (let i = 0; i < option_gender.length; i++) {
  if (option_gender[i].value == user.gender) {
    option_gender[i].selected = true;
    break;
  }
};

let option_idType = document.querySelectorAll('#idType option');
for (let i = 0; i < option_gender.length; i++) {
  if (option_idType[i].value == user.idType) {
    option_idType[i].selected = true;
    break;
  }
};

inputAdditionalDetails.value = user.additionalDetails
inputFavoriteAuthor.value = user.favoriteAuthor
inputFavoriteBook.value = user.favoriteBook

if (user.exchange) {
  inputExchange.checked = true
}

inputIDType.addEventListener('change', function () { inputID.value = '' })

//DATOS DE UBICACION
const provinces = getProvinces();

function getProvinces() {
  let provinces = "";
  let request = $.ajax({
    url: '/api/province',
    type: 'get',
    contentType: 'application/x-www-form-urlencoded; charset=utf-8',
    dataType: 'json',
    async: false,
    data: {
    }
  });

  request.done(function (response) {
    provinces = response;
  });

  request.fail(function (error) {
    console.log('Error al cargar datos de provincias. ' + error);
  });

  return provinces;
};

const selectProvinces = document.querySelector('#sltProvince') || document.querySelector('#province');
const selectCounties = document.querySelector('#sltCounty') || document.querySelector('#county');
const selectDistricts = document.querySelector('#sltDistrict') || document.querySelector('#district');

let addProvinces = () => {
  let blankOption = new Option('');

  blankOption.value = '';
  blankOption.selected = true;
  selectProvinces.appendChild(blankOption);

  for (let i = 0; i < provinces.length; i++) {
    let newOption = new Option(provinces[i]['name']);

    newOption.value = provinces[i]['name'];
    if (newOption.value == user.province) {
      newOption.selected = true
    }
    selectProvinces.appendChild(newOption);
  }
};

let addCounties = () => {
  let province = selectProvinces.value;
  selectCounties.innerHTML = '';
  selectDistricts.innerHTML = '';

  let blankOption = new Option('');
  blankOption.value = '';
  selectCounties.appendChild(blankOption);

  for (let i = 0; i < provinces.length; i++) {
    if (province == provinces[i]['name']) {
      let counties = provinces[i]['counties'];

      for (i = 0; i < counties.length; i++) {
        let newOption = new Option(counties[i]['name']);
        newOption.value = counties[i]['name'];
        if (newOption.value == user.county) {
          newOption.selected = true
        }
        selectCounties.appendChild(newOption);
      }

      break;
    }
  }
}

let addDistricts = () => {
  let province = selectProvinces.value;
  let county = selectCounties.value;
  let counties = '';

  selectDistricts.innerHTML = '';

  let blankOption = new Option('');
  blankOption.value = '';
  selectDistricts.appendChild(blankOption);

  for (let i = 0; i < provinces.length; i++) {
    if (province == provinces[i]['name']) {
      counties = provinces[i]['counties'];
      break;
    }
  }

  for (let i = 0; i < counties.length; i++) {
    if (county == counties[i]['name']) {
      let districts = counties[i]['districts'];

      for (let i = 0; i < districts.length; i++) {
        let newOption = new Option(districts[i]['name']);
        newOption.value = districts[i]['name'];
        if (newOption.value == user.district) {
          newOption.selected = true
        }
        selectDistricts.appendChild(newOption);
      }
    }
  }
}

selectProvinces.addEventListener('change', addCounties);
selectCounties.addEventListener('change', addDistricts);

addProvinces();
addCounties();
addDistricts();

//PARA RELLENAR GENEROS
const literaryGenre = getGenre();

function getGenre() {
  let genre = "";
  let request = $.ajax({
    url: '/api/genre',
    type: 'get',
    contentType: 'application/x-www-form-urlencoded; charset=utf-8',
    dataType: 'json',
    async: false,
    data: {
    }
  });

  request.done(function (response) {
    genre = response.genres_list;
  });

  request.fail(function (error) {
    console.log('Error al cargar los géneros. ' + error);
  });

  return genre;
};

//Agregar géneros al div

const myGenre = document.getElementById("myGenre");

addGenre();

function addGenre() {
  for (let i = 0; i < literaryGenre.length; i++) {
    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.value = literaryGenre[i]["_id"];
    checkbox.id = literaryGenre[i]["_id"];
    for (let i = 0; i < user.favoriteGenres.length; i++) {
      if (checkbox.value == user.favoriteGenres[i]["_id"]) {
        checkbox.checked = true
      }
    }

    var label = document.createElement('label');

    label.htmlFor = literaryGenre[i]["_id"]

    label.appendChild(document.createTextNode(literaryGenre[i]["name"]));

    myGenre.appendChild(checkbox);
    myGenre.appendChild(label);
  }
}


//PARA AUTOCOMPLEAR AUTORES Y LIBROS

//Se recuperan todos los autores de la base de datos
var authors = getAuthors();

var authorArray = [];

authorArray = prepareAuthorArray();

function prepareAuthorArray() {
  let authorArray = []
  for (let i = 0; i < authors.length; i++) {
    authorArray[i] = authors[i]['firstname'] + " " + authors[i]['lastname']
  }
  return authorArray
}

function getAuthors() {
  let authors = ""
  let request = $.ajax({
    url: '/api/author',
    type: 'get',
    contentType: 'application/x-www-form-urlencoded; charset=utf-8',
    dataType: 'json',
    async: false,
    data: {
    }
  });

  request.done(function (response) {
    authors = response.authors_list;
  });

  request.fail(function (error) {
    console.log('Error al cargar los autores. ' + error);
  });

  return authors
};

//Se recuperan todos los libros de la base de datos
var books = getBooks();

var bookArray = [];

bookArray = prepareBookArray();

function prepareBookArray() {
  let bookArray = []
  for (let i = 0; i < books.length; i++) {
    bookArray[i] = books[i]['name']
  }
  return bookArray
}

function getBooks() {
  let books = ""
  let request = $.ajax({
    url: '/api/book',
    type: 'get',
    contentType: 'application/x-www-form-urlencoded; charset=utf-8',
    dataType: 'json',
    async: false,
    data: {
    }
  });

  request.done(function (response) {
    books = response.books_list;
  });

  request.fail(function (error) {
    console.log('Error al cargar los libros. ' + error);
  });

  return books
};

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function (e) {
    var a, b, i, val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) { return false; }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function (e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
          /*close the list of autocompleted values,
          (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
      increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) { //up
      /*If the arrow UP key is pressed,
      decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}


//ACTUALIZAR

let _id = user._id

let btnUpdate = document.querySelector('#btnUpdate')

btnUpdate.addEventListener('click', tryUpdate)

function tryUpdate() {

  let FavoriteGenre = [];

  for (let i = 0, k = 0; i < literaryGenre.length; i++) {
    let genreCheckbox = document.getElementById(literaryGenre[i]["_id"]);
    if (genreCheckbox.checked == true) {
      FavoriteGenre[k] = literaryGenre[i]["_id"]
      k++
    }
  }

  let bError = false;

  bError = validate(FavoriteGenre);

  if (bError) {
    swal.fire({
      type: 'warning',
      title: 'Usuario no actualizado',
      text: 'Por favor revise los campos resaltados',
      confirmButtonText: 'Entendido'
    });
  } else {
    update(FavoriteGenre)
  }
}

function update(pFavoriteGenre) {
  let request = $.ajax({
    url: '/api/user',
    method: "PUT",
    data: {
      _id: _id,
      firstName: inputFirstName.value,
      middleName: inputMiddleName.value,
      firstLastName: inputLastName.value,
      secondLastName: inputSecondLastName.value,
      gender: option_gender.value,
      id: inputID.value,
      idType: option_idType.value,
      province: selectProvinces.value,
      county: selectCounties.value,
      district: selectDistricts.value,
      additionalDetails: inputAdditionalDetails.value,
      favoriteGenres: pFavoriteGenre,
      favoriteBook: inputFavoriteAuthor.value,
      favoriteAuthor: inputFavoriteBook.value,
      email: inputEmail.value,
      avatar: inputAvatar.src,
      nickname: inputNickname.value,
      exchange: inputExchange.checked
    },
    dataType: "json",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  });

  request.done(function () {
    Swal.fire({
      title: 'Gracias',
      text: 'Usuario actualizado exitosamente',
      type: 'success',
      confirmButtonText: 'Ok'
    }).then(function () {
      window.location.href = '/users/profile.html'
    });
  });

  request.fail(function () {
    Swal.fire({
      title: 'Error',
      text: "Ha ocurrido un error",
      type: 'error',
      confirmButtonText: 'Ok'
    });
  })
}

//VALIDACIONES 

const users = getUsers();

function getUsers() {
  let users = "";

  let request = $.ajax({
    url: '/api/user',
    type: 'get',
    contentType: 'application/x-www-form-urlencoded; charset=utf-8',
    dataType: 'json',
    async: false,
    data: {
    }
  });

  request.done(function (response) {
    users = response;
  });

  request.fail(function (error) {
    console.log('Error al cargar los usuarios. ' + error);
  });

  return users;
};


//Valida que el autor exista

function findAuthor() {
  let userFavoriteAuthor = inputFavoriteAuthor.value;
  let bError = true;
  for (let i = 0; i < authorArray.length; i++) {
    if (userFavoriteAuthor == authorArray[i]) {
      bError = false;
      break;
    }
  }
  return bError
}

//Valida que el libro exista

function findBook() {
  let userFavoriteBook = inputFavoriteBook.value;
  let bError = true;
  for (let i = 0; i < bookArray.length; i++) {
    if (userFavoriteBook == bookArray[i]) {
      bError = false;
      break;
    }
  }
  return bError
}

function validate(pFavoriteGenre) {

  let bError = false;

  if (inputFirstName.value == "") {
    bError = true
    inputFirstName.classList.add('error')
  } else {
    inputFirstName.classList.remove('error')
  }
  if (inputLastName.value == "") {
    bError = true
    inputLastName.classList.add('error')
  } else {
    inputLastName.classList.remove('error')
  }
  if (sltGender.value == "") {
    bError = true
    sltGender.classList.add('error')
  } else {
    sltGender.classList.remove('error')
  }
  if (inputID.value == "" || find_ID() == true) {
    bError = true
    inputID.classList.add('error')
  } else {
    inputID.classList.remove('error')
  }
  if (sltidType.value == "") {
    bError = true
    sltidType.classList.add('error')
  } else {
    sltidType.classList.remove('error')
  }
  if (inputEmail == "" || validate_Email() == true) {
    bError = true
    inputEmail.classList.add('error')
  } else {
    inputEmail.classList.remove('error')
  }
  if (selectProvinces.value == "") {
    bError = true
    selectProvinces.classList.add('error')
  } else {
    selectProvinces.classList.remove('error')
  }
  if (selectCounties.value == "") {
    bError = true
    selectCounties.classList.add('error')
  } else {
    selectCounties.classList.remove('error')
  }
  if (selectDistricts.value == "") {
    bError = true
    selectDistricts.classList.add('error')
  } else {
    selectDistricts.classList.remove('error')
  }
  if (inputAdditionalDetails.value == "") {
    bError = true
    inputAdditionalDetails.classList.add('error')
  } else {
    inputAdditionalDetails.classList.remove('error')
  }
  if (pFavoriteGenre.length == 0) {
    bError = true
    document.getElementById("myGenre").classList.add('error');
  } else {
    document.getElementById("myGenre").classList.remove('error');
  }
  if (inputNickname.value == "" || find_Nickname() == true) {
    bError = true
    inputNickname.classList.add('error')
  } else {
    inputNickname.classList.remove('error')
  }
  if (inputFavoriteAuthor.value != "") {
    if (findAuthor() == true) {
      inputFavoriteAuthor.classList.add('error')
      bError=true
    } else {
      inputFavoriteAuthor.classList.remove('error')
    }
  }
  if (inputFavoriteBook.value != "") {
    if (findBook() == true) {
      inputFavoriteBook.classList.add('error')
      bError=true
    } else {
      inputFavoriteBook.classList.remove('error')
    }
  }
  return bError;
}

function find_ID() {

  let bError = false;

  for (let i = 0; i < users.length; i++) {
    if (inputID.value == users[i]['id'] && _id != users[i]['_id']) {
      console.log('ID ya existe')
      inputID.classList.add('error')
      bError = true
      break
    } else {
      inputID.classList.remove('error')
    }
  }

  return bError
}

function validate_Email() {

  let bError = false

  if (isValidEmail(inputEmail.value)) {
    if (find_Email() == true) {
      bError = true
    }
  } else {
    console.log('Email no tiene el formato adecuado')
    inputEmail.classList.add('error')
    bError = true
  }
  return bError
}

function isValidEmail(email) {
  var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
}

function find_Email() {

  let bError = false

  for (let i = 0; i < users.length; i++) {
    if (inputEmail.value == users[i]['email'] && _id != users[i]['_id']) {
      console.log('Email ya existe')
      inputEmail.classList.add('error')
      bError = true
      break
    } else {
      inputEmail.classList.remove('error')
    }
  }

  return bError
}

function find_Nickname() {

  let bError = false;

  for (let i = 0; i < users.length; i++) {
    if (inputNickname.value == users[i]['nickname'] && _id != users[i]['_id']) {
      console.log('Nickname ya existe')
      inputNickname.classList.add('error')
      bError = true
      break
    } else {
      inputNickname.classList.remove('error')
    }
  }

  return bError
}
