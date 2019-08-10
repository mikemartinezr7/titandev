'use strict'

//Variables para crear contraseña

let buttonSavePassword = document.querySelector('#btnSavePassword');
let inputToken = document.querySelector('#randToken');
let inputEmail = document.querySelector('#txtEmail');
let inputPassword = document.querySelector('#password');
let inputConfirmPassword = document.querySelector('#passConfirm')


//Cuando se hace click en buttonValidate, se llama a la función validate_token
buttonSavePassword.addEventListener('click',validate_data);

//Valida que el PIN ingresado coincida con el PIN guardado para el usuario

function validate_data(){

    let userToken = obtain_User_Token(inputEmail.value);
    
    if(inputToken.value!=userToken){
        inputToken.classList.add('error');
        console.log("PIN Incorrecto");
    }else{
        inputToken.classList.remove('error');
        if(inputPassword.value!=inputConfirmPassword.value){
            console.log("Las contraseñas no coinciden");
            inputConfirmPassword.classList.add('error');
        }else{
            if(inputPassword.value==""){
                inputConfirmPassword.classList.remove('error');
                inputPassword.classList.add('error');
                console.log("La contraseña no puede estar en blanco")
            }else{
                inputPassword.classList.remove('error');
                console.log("La contraseña es válida");
                save_password(inputPassword.value,inputEmail.value)
            }
        }
        
    }
};

//Solicita a la base de datos la contraseña del usuario con base en el correo electrónico ingresado

function save_password(psinputPassword,psinputEmail){
    let request = $.ajax({
        url: '/api/user/password',
        type: 'POST',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false,
        data:{
            email: psinputEmail,
            password: psinputPassword
        }
      });
    request.done(function(response){
        console.log(response);
    });
    request.fail(function(){
    });
}

function obtain_User_Token(psinputEmail){
    let userToken = "";
    let request = $.ajax({
        url: '/api/user/randomToken',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false,
        data:{
            email: psinputEmail
        }
      });
    request.done(function(response){
        console.log(response);
        userToken = response[0].randomToken;
    });
    request.fail(function(){
    });
    return userToken;
};