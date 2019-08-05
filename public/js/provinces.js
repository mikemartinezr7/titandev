'use strict'

const provinces = get_Provinces();

function get_Provinces() {
  let provinces = "";
  let request = $.ajax({
    url: '/api/province',
    type: 'get',
    contentType: 'application/x-www-form-urlencoded; charset=utf-8',
    dataType: 'json',
    async: false,
    data: {
    }
  });

  request.done(function (response) {
    provinces = response;
  });

  request.fail(function (error) {
    console.log('Error al cargar datos de provincias. ' + error);
  });

  return provinces;
};

const select_provinces = document.querySelector('#sltProvince');
const select_counties = document.querySelector('#sltCounty');
const select_districts = document.querySelector('#sltDistrict');

let add_Provinces = () => {
  let blankOption = new Option('');
  blankOption.value = '';
  blankOption.selected = true;
  select_provinces.appendChild(blankOption);

  for (let i = 0; i < provinces.length; i++) {
    let newOption = new Option(provinces[i]['name']);
    
    newOption.value = provinces[i]['_id'];
    select_provinces.appendChild(newOption);
  }
};

let add_Counties = () => {
  let province = select_provinces.value;
  
  select_counties.innerHTML = '';

  let blankOption = new Option('');
  blankOption.value = '';
  select_counties.appendChild(blankOption);

  for (let i = 0; i < provinces.length; i++) {
    if (province == provinces[i]['_id']) {
      let counties = provinces[i]['counties'];
      
      for (i = 0; i < counties.length; i++) {
        let newOption = new Option(counties[i]['name']);
        newOption.value = counties[i]['name'];
        select_counties.appendChild(newOption);
      }

      break;
    }
  }
}

let add_Districts = () => {
  let province = select_provinces.value;
  let county = select_counties.value;
  let counties = "";

  select_districts.innerHTML = '';

  let blankOption = new Option('');
  blankOption.value = '';
  select_districts.appendChild(blankOption);

  for (let i = 0; i < provinces.length; i++) {
    if (province == provinces[i]['name']) {
      counties = provinces[i]['counties'];
      break;
    }
  }

  for (let i = 0; i < counties.length; i++) {
    if (county == counties[i]['_id']) {
      let districts = counties[i]['districts'];
      
      for (let i = 0; i < districts.length; i++) {
        let newOption = new Option(districts[i]['name']);
       
        newOption.value = districts[i]['name  '];
        select_districts.appendChild(newOption);
      }
    }
  }
}

select_provinces.addEventListener('change', add_Counties);
select_provinces.addEventListener('change', add_Districts);
select_counties.addEventListener('change', add_Districts);

add_Provinces(); 