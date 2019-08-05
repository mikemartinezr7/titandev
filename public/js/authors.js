'use strict';

const authors_button   = document.querySelector('#btn_create');
const input_authorname = document.querySelector('#txt_authorname');
const input_authorlastname= document.querySelector( '#txt_authorlastname')
const input_biography = document.querySelector('#txt_biography');
const slt_birthyear = document.querySelector('#slt_birthyearr');


function get_data(){

    let input_authorname = input_authorname.value;
    let input_authorlastname = input_authorlastname.value;
    let input_biography = input_biography.value;
    let slt_birthyear = slt_birthyear.selectedOptions[0].textContent;
}

author_button.addEventListener('click', get_data);

function create_authors(pauthorname, pauthorlastname, pbiography, pbirthyear){
    let request = $.ajax({
        url: 'localhost:3000/api/authors',
        method: "POST",
        data: {
            authorname : pauthorname,
            authorlastname : pauthorlastname,
            biography : pbiography,
            birthyear : pbirthyear
        },
        dataType : "json",
        contentType : 'application/x-www-form-urlencoded; charset=UTF-8'
    });

    request.done(funtion(res)
    {
        swal.fire({type : 'success', title : 'El autor se ha registrado', text : res.msg})
    });

    request.fail(funtion(res){
        swal.fire({type : 'error', title : 'error al registrar, verificar datos', text : res.msg});
    });
};