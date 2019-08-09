'use strict';

const register_button = document.querySelector('#btn_register');
const input_name = document.querySelector('#txt_name');
const input_image = document.querySelector('#txt_image')
const slt_genre = document.querySelector('#slt_genre');
const input_author = document.querySelector('#txt_author');
const input_description = document.querySelector('#txt_description');
const input_year = document.querySelector('#txt_year');
const input_editorial = document.querySelector('#txt_editorial');
const slt_type = document.querySelector('#slt_type');
const slt_language = document.querySelector('#slt_language');
const input_isbn = document.querySelector('#txt_isbn');
const input_price = document.querySelector('#txt_price');
const input_quantity = document.querySelector('#txt_quantity');

register_button.addEventListener('click', get_data);

function get_data(){
    let bError = false;
    let name = input_name.value;
    let image = input_image.value;
    let genre = slt_genre.value;
    let author = input_author.value;
    let description = input_description.value;
    let year = Number(input_year.value);
    let editorial = input_editorial.value;
    let type = slt_type.value;
    let language = slt_language.value;
    let isbn = input_isbn.value;
    let price = Number(input_price.value);
    let quantity = Number(input_quantity.value);

    bError = validate();

    if(bError == false){
        create_book(name, image, genre, author, description, year, editorial, type, language, isbn,
        price, quantity);
        console.log("Validacion correcta")
    }else{
        swal.fire({
            type : 'warning',
            title: 'Información Incompleta',
            text : 'Por favor revise los campos resaltados',
            confirmButtonText: 'Entendido'
        });
    }
};

function validate(){
    let bError = false;
    let regExpNumeros = /^[0-9]+$/;

    if(input_name.value == ''){
        bError = true;
        input_name.classList.add('input_error');
    }else{
        input_name.classList.remove('input_error');}

    if(slt_genre.value == ''){
        bError = true;
        slt_genre.classList.add('input_error');
    }else{
        slt_genre.classList.remove('input_error');}

    if(input_author.value == ''){
        bError = true;
        input_author.classList.add('input_error');
    }else{
        input_author.classList.remove('input_error');}
    
    if(input_year.value == ''){
        bError = true;
        input_year.classList.add('input_error');
    }else{
        input_year.classList.remove('input_error');}
    
    if(input_editorial.value == ''){
        bError = true;
        input_editorial.classList.add('input_error');
    }else{
        input_editorial.classList.remove('input_error');}
    
    if(slt_type.value == ''){
        bError = true;
        slt_type.classList.add('input_error');
    }else{
        slt_type.classList.remove('input_error');}
    
    if(slt_language.value == ''){
        bError = true;
        slt_language.classList.add('input_error');
    }else{
        slt_language.classList.remove('input_error');}
    
    if(input_isbn.value == ''){
        bError = true;
        input_isbn.classList.add('input_error');
    }else{
        input_isbn.classList.remove('input_error');}
    
    if(input_price.value == '' || regExpNumeros.test(input_price.value) == false){
        bError = true;
        input_price.classList.add('input_error');
    }else{
        input_price.classList.remove('input_error');}
    
    if(input_quantity.value == '' || regExpNumeros.test(input_quantity.value) == false){
        bError = true;
        input_quantity.classList.add('input_error');
    }else{
        input_quantity.classList.remove('input_error');}

    return bError;
};

function create_book(pname, pimage, pgenre, pauthor, pdescription, pyear, peditorial, ptype, planguage,
pisbn, pprice, pquantity){
    let request = $.ajax({
        url : '/api/book',
        method : "POST",
        data : {
            name : pname,
            image : pimage,
            genre : pgenre,
            author : pauthor,
            description : pdescription,
            year : pyear,
            editorial : peditorial,
            type : ptype,
            language : planguage,
            isbn : pisbn,
            price : pprice,
            quantity : pquantity
        },
        dataType : "json",
        contentType : 'application/x-www-form-urlencoded; charset=UTF-8'  
    })
            
    request.done(function(res){
        console.log('Libro agregado a la base de datos')
        swal.fire({
            type : 'success',
            title: 'Libro agregado a la base de datos',
            confirmButtonText: 'Entendido'
        });
    });

    request.fail(function(res){
        console.log('No se pudo agregar el libro')
    });
                
};
  