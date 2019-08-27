'use strict';

let marcador;
let coordenadas = {};

function mapaInicial() {
  navigator.geolocation.getCurrentPosition(function (position) {
    coordenadas = {
      lng: position.coords.longitude,
      lat: position.coords.latitude
    };
    nuevoMapa(coordenadas);

  }, function (error) { 
    console.log(error); 
  });
}

function mapaEdicion(locationStr) {
  let arrayLocation = locationStr.split(',', 2);

  coordenadas = {
    lng: arrayLocation[1],
    lat: arrayLocation[0]
  };
  
  nuevoMapa(coordenadas);
}

function nuevoMapa(coordenadas) {
  let mostrarMapa = new google.maps.Map(document.getElementById('mapa'), {
      zoom: 15,
      center: new google.maps.LatLng(coordenadas.lat, coordenadas.lng),
    });

  console.log(mostrarMapa);
  marcador = new google.maps.Marker({
    map: mostrarMapa,
    draggable: true,
    animation: google.maps.Animation.DROP,
    position: new google.maps.LatLng(coordenadas.lat, coordenadas.lng),
  });

  marcador.addListener('click', toggleBounce);

  marcador.addListener('dragend', function (event) {
    document.getElementById('location').value = this.getPosition().lat() + "," + this.getPosition().lng();
  });
}

function toggleBounce() {
  if (marcador.getAnimation() !== null) {
    marcador.setAnimation(null);
  } else {
    marcador.setAnimation(google.maps.Animation.BOUNCE);
  }
}