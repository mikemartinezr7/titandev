'use strict';

let buttonSignIn = document.querySelector('#btnSignIn');
let inputEmail = document.querySelector('#txtEmail');
let inputPassword = document.querySelector('#passPassword');

//buttonSignIn.addEventListener('click',sign_in);

function sign_in(){

    let bError = false;

    bError = validate_Password();
    
    if(bError == true){
        console.log("No se pudo iniciar sesión");
    }else{
        console.log("Inicio de sesión existoso");
    }

};

function validate_Password(){
    
    let bError = false;
    let userPassword = obtain_User_Password(inputEmail.value);

    if(inputPassword.value!=userPassword){
        bError = true
    }

    return bError;
};

function obtain_User_Password(psinputEmail){
    let userPassword = "";
    let request = $.ajax({
        url: 'http://localhost:3000/api/user/password',
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