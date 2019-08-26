'use strict';

const create_button = document.querySelector('#btn_create');
const input_name = document.querySelector('#txt_name');
const slt_type = document.querySelector('#slt_type');
const slt_genre = document.querySelector('#slt_genre');
const slt_startTime = document.querySelector('#slt_startTime');
const slt_endTime = document.querySelector('#slt_endTime');
const slt_day = document.querySelector('#slt_day');
const input_branch = document.querySelector('#txt_branch');
let btnCancel = document.querySelector('#btnCancel');

btnCancel.addEventListener('click', function () {
  window.location.href = '/clubs/listClubs.html'
})

create_button.addEventListener('click', get_data);

function get_data(){
    let bError = false;
    let name = input_name.value;
    let type = slt_type.value;
    let genre = slt_genre.value;
    let startTime = slt_startTime.value;
    let endTime = slt_endTime.value;
    let day = slt_day.value;
    let branch = input_branch.value;

    bError = validate();

    if(bError == false){
        create_club(name, type, genre, startTime, endTime, day, branch);
        console.log("Validación Correcta")
    }else{
        swal.fire({
            type : 'warning',
            title : 'Información Incompleta',
            text : 'Por favor revise los campos resaltados',
            confirmButtonText : 'Entendido'
        });
    }
};

function validate(){
    let bError = false;

    if(input_name.value == '' ){
        bError = true;
        input_name.classList.add('input_error');
    }else{
        input_name.classList.remove('input_error');}

    if(slt_type.value == ''){
        bError = true;
        slt_type.classList.add('input_error');
    }else{
        slt_type.classList.remove('input_error');}
    
    if(slt_genre.value == ''){
        bError = true;
        slt_genre.classList.add('input_error');
    }else{
        slt_genre.classList.remove('input_error');}
    
    if(slt_type.value == 'Presencial' && slt_startTime.value == ''){
        bError = true;
        slt_startTime.classList.add('input_error');
    }else{
        slt_startTime.classList.remove('input_error');}
    
    if(slt_type.value == 'Presencial' && slt_endTime.value == ''){
        bError = true;
        slt_endTime.classList.add('input_error');
    }else{
        slt_endTime.classList.remove('input_error');}

    if(slt_type.value == 'Presencial' && slt_day.value == ''){
        bError = true;
        slt_day.classList.add('input_error');
    }else{
        slt_day.classList.remove('input_error');}

    if(slt_type.value == 'Presencial' && input_branch.value == ''){
        bError = true;
        input_branch.classList.add('input_error');
    }else{
        input_branch.classList.remove('input_error');}
    
    return bError;
};

function create_club(pname, ptype, pgenre, pstartTime, pendTime, pday, pbranch){
    let request = $.ajax({
        url : '/api/club',
        method : "POST",
        data : {
            name : pname,
            type : ptype,
            genre : pgenre,
            startTime : pstartTime,
            endTime : pendTime,
            day : pday,
            branch : pbranch
        },
        dataType : "json",
        contentType : 'application/x-www-form-urlencoded; charset=UTF-8'
    })

    request.done(function(res){
        console.log('Club agregado a la base de datos')
        swal.fire({
            type : 'success',
            title: 'Club creado exitosamente',
            confirmButtonText: 'Entendido'
        });
    });

    request.fail(function(res){
        console.log('No se pudo agregar el club a la base de datos')
    });
};
