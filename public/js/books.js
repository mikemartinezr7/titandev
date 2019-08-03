'use strict';

const create_button = document.querySelector('#btn_create');

const input_name = document.querySelector('#txt_name');
const slt_genre = document.querySelector('#slt_genre');
const input_author = document.querySelector('#txt_author');
const input_description = document.querySelector('#txt_description');
const slt_year = document.document.querySelector('#slt_year');
const input_editorial = document.querySelector('#txt_editorial');
const slt_type = document.querySelector('#slt_type');
const slt_language = document.querySelector('#slt_language');
const input_sbn = document.querySelector('#txt_isbn');
const input_price = document.querySelector('#txt_price');
const input_quantity = document.querySelector('#txt_quantity');

function get_data(){

    let name = input_name.value;
    let genre = slt_genre.selectedOptions[0].textContent;
    let author = input_author.value;
    let description = input_description.value;
    let year = slt_year.selectedOptions[0].textContent;
    let editorial = input_editorial.value;
    let type = slt_type.selectedOptions[0].textContent;
    let language = slt_language.selectedOptions[0].textContent;
    let isbn = input_isbn.value;
    let price = input_price.value;
    let quantity = input_quantity.value;
}

create_button.addEventListener('click', get_data);

function create_book(pname, pgenre, pauthor, pdescription, pyear, peditorial, ptype, planguage,
pisbn, pprice, pquantity){
    let request = $.ajax({
        url: 'localhost:3000/api/book',
        method: "POST",
        data: {
            name : pname,
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
    });

    request.done(funtion(res){
        swal.fire({
            type : 'success',
            title : 'Libro registrado con éxitosamente',
            text : res.msg

        })
    });

    request.fail(funtion(res){
        swal.fire({
            type : 'error',
            title : 'No se pudo registrar el libro',
            text : res.msg
        });
    });
};