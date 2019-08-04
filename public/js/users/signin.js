'use strict'

//Variables para inicio de sesión

let buttonSignIn = document.querySelector('#btnSignIn');
let inputPassword = document.querySelector('#passPassword');


//Cuando se hace click en buttonSignIn, se llama a la función sign_in
//buttonSignIn.addEventListener('click',sign_in);

//Inicio de sesión (valida contraseña y responde con éxito o error)

function sign_in(){

    let bError = false;

    bError = validate_Password();
    
    if(bError == true){
        console.log("No se pudo iniciar sesión");
    }else{
        console.log("Inicio de sesión existoso");
    }

};

//Valida que la contraseña ingresada coincida con la contraseña guardada para el usuario

function validate_Password(){
    
    let bError = false;
    let userPassword = obtain_User_Password(inputEmail.value);

    if(inputPassword.value!=userPassword){
        bError = true
    }

    return bError;
};

//Solicita a la base de datos la contraseña del usuario con base en el correo electrónico ingresado

function obtain_User_Password(psinputEmail){
    let userPassword = "";
    let request = $.ajax({
        url: '/api/user/password',
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
        userPassword = response[0].password;
    });
    request.fail(function(){
    });
    return userPassword;
};