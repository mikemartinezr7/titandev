'use strict'

const provinces = getProvinces();

function getProvinces() {
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

const selectProvinces = document.querySelector('#sltProvince') || document.querySelector('#province');
const selectCounties = document.querySelector('#sltCounty') || document.querySelector('#county');
const selectDistricts = document.querySelector('#sltDistrict') || document.querySelector('#district');

let addProvinces = () => {
  let blankOption = new Option('');

  blankOption.value = '';
  blankOption.selected = true;
  selectProvinces.appendChild(blankOption);

  for (let i=0; i<provinces.length; i++) {
    let newOption = new Option(provinces[i]['name']);
    
    newOption.value = provinces[i]['name'];
    selectProvinces.appendChild(newOption);
  }
};

let addCounties = () => {
  let province = selectProvinces.value;
  selectCounties.innerHTML = '';

  let blankOption = new Option('');
  blankOption.value = '';
  selectCounties.appendChild(blankOption);

  for (let i=0; i<provinces.length; i++) {
    if (province == provinces[i]['name']) {
      let counties = provinces[i]['counties'];
      
      for (i = 0; i < counties.length; i++) {
        let newOption = new Option(counties[i]['name']);
        newOption.value = counties[i]['name'];
        selectCounties.appendChild(newOption);
      }

      break;
    }
  }
}

let addDistricts = () => {
  let province = selectProvinces.value;
  let county = selectCounties.value;
  let counties = '';

  selectDistricts.innerHTML = '';

  let blankOption = new Option('');
  blankOption.value = '';
  selectDistricts.appendChild(blankOption);

  for (let i=0; i<provinces.length; i++) {
    if (province == provinces[i]['name']) {
      counties = provinces[i]['counties'];
      break;
    }
  }

  for (let i = 0; i < counties.length; i++) {
    if (county == counties[i]['name']) {
      let districts = counties[i]['districts'];
      
      for (let i = 0; i < districts.length; i++) {
        let newOption = new Option(districts[i]['name']);
       
        newOption.value = districts[i]['name'];
        selectDistricts.appendChild(newOption);
      }
    }
  }
}

selectProvinces.addEventListener('change', addCounties);
selectCounties.addEventListener('change', addDistricts);

addProvinces(); 