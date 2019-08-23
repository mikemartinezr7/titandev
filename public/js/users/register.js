'use strict';

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

//Variables para registro de usuario

let buttonRegister = document.querySelector('#btnRegister');
let inputFirstName = document.querySelector('#txtFirstName');
let inputMiddleName = document.querySelector('#txtMiddleName');
let inputLastName = document.querySelector('#txtLastName');
let inputSecondLastName = document.querySelector('#txtSecondLastName');
let inputGender = document.querySelector('#sltGender');
let inputIDType = document.querySelector('#idType');
let inputID = document.querySelector('#txtID');
var inputEmail = document.querySelector('#txtEmail');
let inputProvince = document.querySelector('#sltProvince');
let inputCounty = document.querySelector('#sltCounty');
let inputDistrict = document.querySelector('#sltDistrict');
let inputAdditionalDetails = document.querySelector('#txtAdditionalDetails');
let inputFiction = document.querySelector('#fiction');
let inputTerror = document.querySelector('#terror');
let inputComedy = document.querySelector('#comedy');
let inputDrama = document.querySelector('#drama');
let inputTragedy = document.querySelector('#tragedy');
let inputRomance = document.querySelector('#romance');
let inputNovel = document.querySelector('#novel');
let inputStory = document.querySelector('#story');
let inputThriller = document.querySelector('#thriller');
let inputTale = document.querySelector('#tale');
let inputDidacticNovel = document.querySelector('#didacticNovel');
let inputFavoriteBook = document.querySelector('#txtFavoriteBook');
let inputFavoriteAuthor = document.querySelector('#txtFavoriteAuthor');
let inputNickname = document.querySelector('#txtNickname');
let inputAvatar = document.querySelector('#image_preview');
let inputExchange = document.querySelector('#Exchange');

//Cuando se hace click en buttonRegister, se llama a la función register_user
buttonRegister.addEventListener('click', register_user);

//Validar que los campos únicos no estén siendo utilizados
inputID.addEventListener('change', find_ID);
inputEmail.addEventListener('change', find_Email);
inputNickname.addEventListener('change', find_Nickname);

//Registro de usuario (valida datos y responde con éxito o error)
function register_user() {
  //Registra el arreglo de géneros favoritos
  let FavoriteGenre = [];
  let i = 0;

  if (inputFiction.checked == true) {
    let Fiction = "5d45b9d26ec5d72d90bbcb46";
    FavoriteGenre[i] = Fiction;
    i++
  }
  if (inputTerror.checked == true) {
    let Terror = "5d45b9ed6ec5d72d90bbcb47";
    FavoriteGenre[i] = Terror;
    i++
  }
  if (inputComedy.checked == true) {
    let Comedy = "5d45b9f56ec5d72d90bbcb48";
    FavoriteGenre[i] = Comedy;
    i++
  }
  if (inputDrama.checked == true) {
    let Drama = "5d45b9fc6ec5d72d90bbcb49";
    FavoriteGenre[i] = Drama;
    i++
  }
  if (inputTragedy.checked == true) {
    let Tragedy = "5d45ba026ec5d72d90bbcb4a";
    FavoriteGenre[i] = Tragedy;
    i++
  }
  if (inputRomance.checked == true) {
    let Romance = "5d45ba076ec5d72d90bbcb4b";
    FavoriteGenre[i] = Romance;
    i++
  }
  if (inputNovel.checked == true) {
    let Novel = "5d45ba0c6ec5d72d90bbcb4c";
    FavoriteGenre[i] = Novel;
    i++
  }
  if (inputStory.checked == true) {
    let Story = "5d45ba116ec5d72d90bbcb4d";
    FavoriteGenre[i] = Story;
    i++
  }
  if (inputThriller.checked == true) {
    let Thriller = "5d45ba166ec5d72d90bbcb4e";
    FavoriteGenre[i] = Thriller;
    i++
  }
  if (inputTale.checked == true) {
    let Tale = "5d45ba1c6ec5d72d90bbcb4f";
    FavoriteGenre[i] = Tale;
    i++
  }
  if (inputDidacticNovel.checked == true) {
    let DidacticNovel = "5d45ba276ec5d72d90bbcb50";
    FavoriteGenre[i] = DidacticNovel;
  }

  //Recupera los valores ingresados
  let FirstName = inputFirstName.value;
  let MiddleName = inputMiddleName.value;
  let LastName = inputLastName.value;
  let SecondLastName = inputSecondLastName.value;
  let Gender = inputGender.value;
  let ID = inputID.value;
  let IDType = inputIDType.value;
  let Email = inputEmail.value;
  let Province = inputProvince.value;
  let County = inputCounty.value;
  let District = inputDistrict.value;
  let AdditionalDetails = inputAdditionalDetails.value;
  let FavoriteBook = inputFavoriteBook.value;
  let FavoriteAuthor = inputFavoriteAuthor.value;
  let Nickname = inputNickname.value;
  let Avatar = inputAvatar.src;
  let Exchange = inputExchange.checked;

  let bError = false;

  bError = validate(FirstName, LastName, Gender, ID, IDType, Email, Province, County, District, AdditionalDetails, FavoriteGenre, Nickname);

  if (bError == false) {
    register(FirstName, MiddleName, LastName, SecondLastName, Gender, ID, IDType, Email, Province, County, District, AdditionalDetails, FavoriteGenre, FavoriteBook, FavoriteAuthor, Nickname, Avatar, Exchange);
  } else {
    $(window).scrollTop(0);
    $('.box-alert').show();
  }
}

//Registrar en la base de datos
function register(pFirstName, pMiddleName, pLastName, pSecondLastName, pGender, pID, pIDType, pEmail, pProvince, pCounty, pDistrict, pAdditionalDetails, pFavoriteGenre, pFavoriteBook, pFavoriteAuthor, pNickname, pAvatar, pExchange) {
  let request = $.ajax({
    url: '/api/user',
    method: "POST",
    data: {
      firstName: pFirstName,
      middleName: pMiddleName,
      firstLastName: pLastName,
      secondLastName: pSecondLastName,
      gender: pGender,
      id: pID,
      idType: pIDType,
      province: pProvince,
      county: pCounty,
      district: pDistrict,
      additionalDetails: pAdditionalDetails,
      favoriteGenres: pFavoriteGenre,
      favoriteBook: pFavoriteBook,
      favoriteAuthor: pFavoriteAuthor,
      email: pEmail,
      avatar: pAvatar,
      nickname: pNickname,
      type: "client",
      exchange: pExchange
    },
    dataType: "json",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  });

  request.done(function (response) {
    console.log(response);
    Swal.fire({
      title: 'Gracias',
      text: response.message + '. Un e-mail ha sido enviado a la cuenta ' + pEmail +' con el fin de confirmar su registro.',
      type: 'success',
      confirmButtonText: 'Ok'
    });

    $('#frmRegisterUser').trigger('reset');
    $('.box-alert ul').empty();
    $('.box-alert').hide();
    $('#image_preview').attr('src', '../img/no-avatar.jpg');
    $(window).scrollTop(0);
  });
  
  request.fail(function (response) {
    Swal.fire({
      title: 'Error',
      text: response.message,
      type: 'error',
      confirmButtonText: 'Ok'
    });
  });
};

//Validar la información ingresada
function validate(pFirstName, pLastName, pGender, pID, pIDType, pEmail, pProvince, pCounty, pDistrict, pAdditionalDetails, pFavoriteGenre, pNickname) {
  let bError = false;

  if (pFirstName == "") {
    bError = true
    inputFirstName.classList.add('error')
  } else {
    inputFirstName.classList.remove('error')
  }
  if (pLastName == "") {
    bError = true
    inputLastName.classList.add('error')
  } else {
    inputLastName.classList.remove('error')
  }
  if (pGender == "") {
    bError = true
    inputGender.classList.add('error')
  } else {
    inputGender.classList.remove('error')
  }
  if (pID == "") {
    bError = true
    inputID.classList.add('error')
  } else {
    inputID.classList.remove('error')
  }
  if (pIDType == "") {
    bError = true
    inputIDType.classList.add('error')
  } else {
    inputIDType.classList.remove('error')
  }
  if (pEmail == "") {
    bError = true
    inputEmail.classList.add('error')
  } else {
    inputEmail.classList.remove('error')
  }
  if (pProvince == "") {
    bError = true
    inputProvince.classList.add('error')
  } else {
    inputProvince.classList.remove('error')
  }
  if (pCounty == "") {
    bError = true
    inputCounty.classList.add('error')
  } else {
    inputCounty.classList.remove('error')
  }
  if (pDistrict == "") {
    bError = true
    inputDistrict.classList.add('error')
  } else {
    inputDistrict.classList.remove('error')
  }
  if (pAdditionalDetails == "") {
    bError = true
    inputAdditionalDetails.classList.add('error')
  } else {
    inputAdditionalDetails.classList.remove('error')
  }
  if (pFavoriteGenre.length == 0) {
    bError = true
    document.getElementById("favGenre").classList.add('error');
  } else {
    document.getElementById("favGenre").classList.add('error');
  }
  if (pAdditionalDetails == "") {
    bError = true
    inputNickname.classList.add('error')
  } else {
    inputNickname.classList.remove('error')
  }

  return bError;
}

function find_ID() {
  for (let i = 0; i < users.length; i++) {
    if (inputID.value == users[i]['id']) {
      console.log('ID ya existe')
      inputID.classList.add('error')
      break
    } else {
      inputID.classList.remove('error')
    }
  }
}

function find_Email() {
  for (let i = 0; i < users.length; i++) {
    if (inputEmail.value == users[i]['email']) {
      console.log('Email ya existe')
      inputEmail.classList.add('error')
      break
    } else {
      inputEmail.classList.remove('error')
    }
  }
}

function find_Nickname() {
  for (let i = 0; i < users.length; i++) {
    if (inputNickname.value == users[i]['nickname']) {
      console.log('Nickname ya existe')
      inputNickname.classList.add('error')
      break
    } else {
      inputNickname.classList.remove('error')
    }
  }
}

//Se recuperan todos los autores de la base de datos
var authors = getAuthors();

function getAuthors() {
  let authors = "";
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
    authors = response;
  });

  request.fail(function (error) {
    console.log('Error al cargar los autores. ' + error);
  });

  return authors;
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

$('#idType').change(function () {
  switch ($(this).val()) {
    case 'nacional': $('#txtID').mask('0-0000-0000', { placeholder: '0-0000-0000' }); break;
    case 'residente': $('#txtID').mask('0-000-000000', { placeholder: '0-000-000000' }); break;
    case 'nacionalizado': $('#txtID').mask('0-0000-0000', { placeholder: '0-0000-0000' }); break;
    case 'extranjero': $('#txtID').mask('000000000000', { placeholder: '000000000000' }); break;
    default: break;
  }
});