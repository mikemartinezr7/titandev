'use strict'

const provinces = get_Provinces();

function get_Provinces (){

    let provinces = "";

    let request = $.ajax({
        url: 'http://localhost:3000/api/province',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false,
        data:{
        }
      });
    
    request.done(function(response){
        console.log(response);
        provinces = response;
        
    });
    
    request.fail(function(){
    
    });

    return provinces;
};

const select_provinces = document.querySelector('#sltProvince');
const select_counties = document.querySelector('#sltCounty');
const select_districts = document.querySelector('#sltDistrict');

let add_Provinces = () =>{
    
    for(let i = 0; i < provinces.length; i++){
        let newOption = new Option(provinces[i]['name']);
        newOption.value = provinces[i]['name'];
        select_provinces.appendChild(newOption);
    }
};

let add_Counties = () =>{
    let province = select_provinces.value;
    select_counties.innerHTML = '';

    let newOption = new Option("Cantón");
    newOption.value = "";
    select_counties.appendChild(newOption);

    for(let i = 0; i < provinces.length; i++){
        if(province == provinces[i]['name']){
            let counties = provinces[i]['counties'];
            for (i = 0; i <counties.length;i++){
                let newOption = new Option(counties[i]['name']);
                newOption.value = counties[i]['name'];
                select_counties.appendChild(newOption);
            }
            break;
        }
        
    }
}

let add_Districts = () =>{
    let province = select_provinces.value;
    let county = select_counties.value;
    let counties = "";
    select_districts.innerHTML = '';

    let newOption = new Option("Distrito");
    newOption.value = "";
    select_districts.appendChild(newOption);

    for(let i = 0; i < provinces.length; i++){
        if(province == provinces[i]['name']){
            counties = provinces[i]['counties'];
            break;
        }
    }

    for(let i = 0; i < counties.length; i++){
        if(county == counties[i]['name']){
            let districts = counties[i]['districts'];
            for (let i = 0; i < districts.length; i++){
                let newOption = new Option(districts[i]['name']);
                newOption.value = districts[i]['name'];
                select_districts.appendChild(newOption);
            }
        }
    }
}

select_provinces.addEventListener('change', add_Counties);
select_provinces.addEventListener('change',add_Districts);
select_counties.addEventListener('change',add_Districts);

add_Provinces(); 