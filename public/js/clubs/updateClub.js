'use strict';

//import swal from "sweetalert";

//*SERVIDOR*//

let search_club = (id_club) => {
    let club = [];

    let request = $.ajax({
        url: "/api/club/"+ id_club,
        method: "GET",
        data: {   
        },
        dataType: "json",
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        async : false
    });

    request.done(function (res){
        club = res.club;
    });

    request.fail(function (jqXHR, textStatus) {

    });
    return club;
};

let update_club = (pname, ptype, pgenre, pstartTime, pendTime, pday, pbranch, pid) =>{
    let request = $.ajax({
        url : '/api/club/update',
        method : "POST",
        data : {
            name : pname,
            type : ptype,
            genre : pgenre,
            startTime : pstartTime,
            endTime : pendTime,
            day : pday,
            branch : pbranch,
            id : pid
        },
        dataType: "json",
        contentType : 'application/x-www-form-urlencoded; charset=UTF-8'
    })

    request.done(function(res){
        swal.fire({
            type: 'success',
            title: 'Club actualizado correctamente',
            confirmButtonText: 'Entendido'
        }).then(function (){
            window.location.href="/clubs/listClubs.html"
        })
    });

    request.fail(function(res){
        swal.fire({
            type: 'error',
            title: 'No se pudo actualizar el club',
            confirmButtonText: 'Entendido'
        });
    });
};

//CONTROLADOR//

const input_name = document.querySelector('#txt_name');
const slt_type = document.querySelector('#slt_type');
const slt_genre = document.querySelector('#slt_genre');
const slt_startTime = document.querySelector('#slt_startTime');
const slt_endTime = document.querySelector('#slt_endTime');
const slt_day = document.querySelector('#slt_day');
const input_branch = document.querySelector('#txt_branch');
const update_button = document.querySelector('#btn_update');

let get_param = (param) => {
    var url_string =  window.location.href;
    var url = new URL(url_string);
    var id = url.searchParams.get(param);//Toma el parámetro id_club del url y retorna el valor
    return id;
};

let _id = get_param('id_club');

let club = search_club(_id);
let show_club = ()=>{
input_name.value = club[0]['name']
input_branch.value = club[0]['branch']

let option_type = document.querySelectorAll('#slt_type option');
for (let i = 0; i< option_type.length; i++){
    if(option_type[i].textContent == club[0]['type']) {
        option_type[i].selected = true;
    }
};

let option_genre = document.querySelectorAll('#slt_genre option');
for (let i = 0; i< option_genre.length; i++){
    if(option_genre[i].textContent == club[0]['genre']) {
        option_genre[i].selected = true;
    }
};

let option_startTime = document.querySelectorAll('#slt_startTime option');
for (let i = 0; i< option_startTime.length; i++){
    if(option_startTime[i].textContent == club[0]['startTime']){
        option_startTime[i].selected = true;
    }
};

let option_endTime = document.querySelectorAll('#slt_endTime option');
for (let i = 0; i< option_endTime.length; i++){
    if(option_endTime[i].textContent == club[0]['endTime']){
        option_endTime[i].selected = true;
    }
};

let option_day = document.querySelectorAll('#slt_day');
for (let i = 0; i< option_day.length; i++){
    if(option_day[i].textContent == club[0]['day']){
        option_day[i].selected = true;
    }
}
};

if(club){
    show_club();
}

let get_data =()=>{
    let bError = false;
    let name = input_name.value;
    let type = slt_type.selectedOptions[0].textContent;
    let genre = slt_genre.selectedOptions[0].textContent;
    let startTime = slt_startTime.selectedOptions[0].textContent;
    let endTime = slt_endTime.selectedOptions[0].textContent;
    let day = slt_day.selectedOptions[0].textContent;
    let branch = input_branch.value;
    
    bError = validate();

if(bError == false){
    update_club (name, type, genre, startTime, endTime, day, branch, _id);
    console.log("Validacion correcta")
}else{
    swal.fire({
        type : 'warning',
        title: 'Información Incompleta',
        text : 'Por favor revise los campos resaltados',
        confirmButtonText: 'Entendido'
        });
    };
};

function validate(){
    let bError = false;

    if(input_name.value == '' ){
        bError = true;
        input_name.classList.add('error');
    }else{
        input_name.classList.remove('error');}

    if(slt_type.value == ''){
        bError = true;
        slt_type.classList.add('error');
    }else{
        slt_type.classList.remove('error');}
    
    if(slt_genre.value == ''){
        bError = true;
        slt_genre.classList.add('error');
    }else{
        slt_genre.classList.remove('error');}
    
    if(slt_type.value == 'Presencial' && slt_startTime.value == ''){
        bError = true;
        slt_startTime.classList.add('error');
    }else{
        slt_startTime.classList.remove('error');}
    
    if(slt_type.value == 'Presencial' && slt_endTime.value == ''){
        bError = true;
        slt_endTime.classList.add('error');
    }else{
        slt_endTime.classList.remove('error');}

    if(slt_type.value == 'Presencial' && slt_day.value == ''){
        bError = true;
        slt_day.classList.add('error');
    }else{
        slt_day.classList.remove('error');}

    if(slt_type.value == 'Presencial' && input_branch.value == ''){
        bError = true;
        input_branch.classList.add('error');
    }else{
        input_branch.classList.remove('error');}
    
    return bError;
};

btn_update.addEventListener('click', get_data);
