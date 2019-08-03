'use strict';

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const db = mongoose.connection;
const appConfig = require('../../../config/config.json');
const provincesData = require('./data/provinces');

console.log('INICIO');

//Database initialization
mongoose.connect('mongodb://' + appConfig.db.server + ':' + appConfig.db.port + '/' + appConfig.db.name, { useNewUrlParser: true });

db.on('error', function (err) {
  console.log('[ ERROR ] Conexion con la BD (' + err + ')');
  process.exit();
});

db.on('open', function (err) {
  console.log('[ OK ] Conexion con la BD');
});


//Get data for provinces, counties and districts
const Province = require("../models/province.model");
const newProvinces = new Province(provincesData);

Province.collection.insertMany([newProvinces], { upsert: true }, function(error, data) {
  if (error) {
      console.log('[ ERROR ] Insertar datos de provincias (' + error + ')');
      process.exit();
  } 
  
  console.log('[ OK ] Insertar datos de provincias');
  
  db.close(function(){
    console.log('FIN');
    process.exit();
  });
});

//Server initalization
const server = app.listen(appConfig.server.port, function () {
  console.log('[ OK ] Servicor corriendo en puerto ' + appConfig.server.port);
});


/*San José	San José	Carmen	10101
San José	San José	Merced	10102
San José	San José	Hospital	10103
San José	San José	Catedral	10104
San José	San José	Zapote	10105
San José	San José	San Francisco de Dos Ríos	10106
San José	San José	Uruca	10107
San José	San José	Mata Redonda	10108
San José	San José	Pavas	10109
San José	San José	Hatillo	10110
San José	San José	San Sebastián	10111
San José	Escazú	Escazú	10201
San José	Escazú	San Antonio	10202
San José	Escazú	San Rafael	10203
San José	Desamparados	Desamparados	10301
San José	Desamparados	San Miguel	10302
San José	Desamparados	San Juan de Dios	10303
San José	Desamparados	San Rafael Arriba	10304
San José	Desamparados	San Antonio	10305
San José	Desamparados	Frailes	10306
San José	Desamparados	Patarrá	10307
San José	Desamparados	San Cristóbal	10308
San José	Desamparados	Rosario	10309
San José	Desamparados	Damas	10310
San José	Desamparados	San Rafael Abajo	10311
San José	Desamparados	Gravilias	10312
San José	Desamparados	Los Guido	10313
San José	Puriscal	Santiago	10401
San José	Puriscal	Mercedes Sur	10402
San José	Puriscal	Barbacoas	10403
San José	Puriscal	Grifo Alto	10404
San José	Puriscal	San Rafael	10405
San José	Puriscal	Candelarita	10406
San José	Puriscal	Desamparaditos	10407
San José	Puriscal	San Antonio	10408
San José	Puriscal	Chires	10409
San José	Tarrazú	San Marcos	10501
San José	Tarrazú	San Lorenzo	10502
San José	Tarrazú	San Carlos	10503
San José	Aserrí	Aserrí	10601
San José	Aserrí	Tarbaca	10602
San José	Aserrí	Vuelta de Jorco	10603
San José	Aserrí	San Gabriel	10604
San José	Aserrí	Legua	10605
San José	Aserrí	Monterrey	10606
San José	Aserrí	Salitrillos	10607
San José	Mora	Colón	10701
San José	Mora	Guayabo	10702
San José	Mora	Tabarcia	10703
San José	Mora	Piedras Negras	10704
San José	Mora	Picagres	10705
San José	Mora	Jaris	10706
San José	Mora	Quitirrisí	10707
San José	Goicoechea	Guadalupe	10801
San José	Goicoechea	San Francisco	10802
San José	Goicoechea	Calle Blancos	10803
San José	Goicoechea	Mata de Plátano	10804
San José	Goicoechea	Ipís	10805
San José	Goicoechea	Rancho Redondo	10806
San José	Goicoechea	Purral	10807
San José	Santa Ana	Santa Ana	10901
San José	Santa Ana	Salitral	10902
San José	Santa Ana	Pozos	10903
San José	Santa Ana	Uruca	10904
San José	Santa Ana	Piedades	10905
San José	Santa Ana	Brasil	10906
San José	Alajuelita	Alajuelita	11001
San José	Alajuelita	San Josecito	11002
San José	Alajuelita	San Antonio	11003
San José	Alajuelita	Concepción	11004
San José	Alajuelita	San Felipe	11005
San José	Vásquez de Coronado	San Isidro	11101
San José	Vásquez de Coronado	San Rafael	11102
San José	Vásquez de Coronado	Dulce Nombre de Jesús	11103
San José	Vásquez de Coronado	Patalillo	11104
San José	Vásquez de Coronado	Cascajal	11105
San José	Acosta	San Ignacio	11201
San José	Acosta	Guaitil	11202
San José	Acosta	Palmichal	11203
San José	Acosta	Cangrejal	11204
San José	Acosta	Sabanillas	11205
San José	Tibás	San Juan	11301
San José	Tibás	Cinco Esquinas	11302
San José	Tibás	Anselmo Llorente	11303
San José	Tibás	León XIII	11304
San José	Tibás	Colima	11305
San José	Moravia	San Vicente	11401
San José	Moravia	San Jerónimo	11402
San José	Moravia	La Trinidad	11403
San José	Montes de Oca	San Pedro	11501
San José	Montes de Oca	Sabanilla	11502
San José	Montes de Oca	Mercedes	11503
San José	Montes de Oca	San Rafael	11504
San José	Turrubares	San Pablo	11601
San José	Turrubares	San Pedro	11602
San José	Turrubares	San Juan de Mata	11603
San José	Turrubares	San Luis	11604
San José	Turrubares	Carara	11605
San José	Dota	Santa María	11701
San José	Dota	Jardín	11702
San José	Dota	Copey	11703
San José	Curridabat	Curridabat	11801
San José	Curridabat	Granadilla	11802
San José	Curridabat	Sánchez	11803
San José	Curridabat	Tirrases	11804
San José	Pérez Zeledón	San Isidro de El General	11901
San José	Pérez Zeledón	El General	11902
San José	Pérez Zeledón	Daniel Flores	11903
San José	Pérez Zeledón	Rivas	11904
San José	Pérez Zeledón	San Pedro	11905
San José	Pérez Zeledón	Platanares	11906
San José	Pérez Zeledón	Pejibaye	11907
San José	Pérez Zeledón	Cajón	11908
San José	Pérez Zeledón	Barú	11909
San José	Pérez Zeledón	Río Nuevo	11910
San José	Pérez Zeledón	Páramo	11911
San José	Pérez Zeledón	La Amistad	11912
San José	León Cortés Castro	San Pablo	12001
San José	León Cortés Castro	San Andrés	12002
San José	León Cortés Castro	Llano Bonito	12003
San José	León Cortés Castro	San Isidro	12004
San José	León Cortés Castro	Santa Cruz	12005
San José	León Cortés Castro	San Antonio	12006
Alajuela	Alajuela	Alajuela	20101
Alajuela	Alajuela	San José	20102
Alajuela	Alajuela	Carrizal	20103
Alajuela	Alajuela	San Antonio	20104
Alajuela	Alajuela	Guácima	20105
Alajuela	Alajuela	San Isidro	20106
Alajuela	Alajuela	Sabanilla	20107
Alajuela	Alajuela	San Rafael	20108
Alajuela	Alajuela	Río Segundo	20109
Alajuela	Alajuela	Desamparados	20110
Alajuela	Alajuela	Turrúcares	20111
Alajuela	Alajuela	Tambor	20112
Alajuela	Alajuela	Garita	20113
Alajuela	Alajuela	Sarapiquí	20114
Alajuela	San Ramón	San Ramón	20201
Alajuela	San Ramón	Santiago	20202
Alajuela	San Ramón	San Juan	20203
Alajuela	San Ramón	Piedades Norte	20204
Alajuela	San Ramón	Piedades Sur	20205
Alajuela	San Ramón	San Rafael	20206
Alajuela	San Ramón	San Isidro	20207
Alajuela	San Ramón	Los Ángeles	20208
Alajuela	San Ramón	Alfaro	20209
Alajuela	San Ramón	Volio	20210
Alajuela	San Ramón	Concepción	20211
Alajuela	San Ramón	Zapotal	20212
Alajuela	San Ramón	Peñas Blancas	20213
Alajuela	San Ramón	San Lorenzo	20214
Alajuela	Grecia	Grecia	20301
Alajuela	Grecia	San Isidro	20302
Alajuela	Grecia	San José	20303
Alajuela	Grecia	San Roque	20304
Alajuela	Grecia	Tacares	20305
Alajuela	Grecia	Río Cuarto	20306(Río Cuarto district became a canton in 2017, new postal code is 21601)
Alajuela	Grecia	Puente de Piedra	20307
Alajuela	Grecia	Bolívar	20308
Alajuela	San Mateo	San Mateo	20401
Alajuela	San Mateo	Desmonte	20402
Alajuela	San Mateo	Jesús María	20403
Alajuela	San Mateo	Labrador	20404
Alajuela	Atenas	Atenas	20501
Alajuela	Atenas	Jesús	20502
Alajuela	Atenas	Mercedes	20503
Alajuela	Atenas	San Isidro	20504
Alajuela	Atenas	Concepción	20505
Alajuela	Atenas	San José	20506
Alajuela	Atenas	Santa Eulalia	20507
Alajuela	Atenas	Escobal	20508
Alajuela	Naranjo	Naranjo	20601
Alajuela	Naranjo	San Miguel	20602
Alajuela	Naranjo	San José	20603
Alajuela	Naranjo	Cirrí Sur	20604
Alajuela	Naranjo	San Jerónimo	20605
Alajuela	Naranjo	San Juan	20606
Alajuela	Naranjo	El Rosario	20607
Alajuela	Naranjo	Palmitos	20608
Alajuela	Palmares	Palmares	20701
Alajuela	Palmares	Zaragoza	20702
Alajuela	Palmares	Buenos Aires	20703
Alajuela	Palmares	Santiago	20704
Alajuela	Palmares	Candelaria	20705
Alajuela	Palmares	Esquipulas	20706
Alajuela	Palmares	La Granja	20707
Alajuela	Poás	San Pedro	20801
Alajuela	Poás	San Juan	20802
Alajuela	Poás	San Rafael	20803
Alajuela	Poás	Carrillos	20804
Alajuela	Poás	Sabana Redonda	20805
Alajuela	Orotina	Orotina	20901
Alajuela	Orotina	El Mastate	20902
Alajuela	Orotina	Hacienda Vieja	20903
Alajuela	Orotina	Coyolar	20904
Alajuela	Orotina	La Ceiba	20905
Alajuela	San Carlos	Quesada	21001
Alajuela	San Carlos	Florencia	21002
Alajuela	San Carlos	Buenavista	21003
Alajuela	San Carlos	Aguas Zarcas	21004
Alajuela	San Carlos	Venecia	21005
Alajuela	San Carlos	Pital	21006
Alajuela	San Carlos	La Fortuna	21007
Alajuela	San Carlos	La Tigra	21008
Alajuela	San Carlos	La Palmera	21009
Alajuela	San Carlos	Venado	21010
Alajuela	San Carlos	Cutris	21011
Alajuela	San Carlos	Monterrey	21012
Alajuela	San Carlos	Pocosol	21013
Alajuela	Zarcero	Zarcero	21101
Alajuela	Zarcero	Laguna	21102
Alajuela	Zarcero	Tapezco	21103
Alajuela	Zarcero	Guadalupe	21104
Alajuela	Zarcero	Palmira	21105
Alajuela	Zarcero	Zapote	21106
Alajuela	Zarcero	Brisas	21107
Alajuela	Valverde Vega	Sarchí Norte	21201
Alajuela	Valverde Vega	Sarchí Sur	21202
Alajuela	Valverde Vega	Toro Amarillo	21203
Alajuela	Valverde Vega	San Pedro	21204
Alajuela	Valverde Vega	Rodríguez	21205
Alajuela	Upala	Upala	21301
Alajuela	Upala	Aguas Claras	21302
Alajuela	Upala	San José o Pizote	21303
Alajuela	Upala	Bijagua	21304
Alajuela	Upala	Delicias	21305
Alajuela	Upala	Dos Ríos	21306
Alajuela	Upala	Yolillal	21307
Alajuela	Upala	Canalete	21308
Alajuela	Los Chiles	Los Chiles	21401
Alajuela	Los Chiles	Caño Negro	21402
Alajuela	Los Chiles	El Amparo	21403
Alajuela	Los Chiles	San Jorge	21404
Alajuela	Guatuso	San Rafael	21501
Alajuela	Guatuso	Buenavista	21502
Alajuela	Guatuso	Cote	21503
Alajuela	Guatuso	Katira	21504
Alajuela	Río Cuarto	Río Cuarto	21601
Cartago	Cartago	Oriental	30101
Cartago	Cartago	Occidental	30102
Cartago	Cartago	Carmen	30103
Cartago	Cartago	San Nicolás	30104
Cartago	Cartago	Aguacaliente o San Francisco	30105
Cartago	Cartago	Guadalupe o Arenilla	30106
Cartago	Cartago	Corralillo	30107
Cartago	Cartago	Tierra Blanca	30108
Cartago	Cartago	Dulce Nombre	30109
Cartago	Cartago	Llano Grande	30110
Cartago	Cartago	Quebradilla	30111
Cartago	Paraíso	Paraíso	30201
Cartago	Paraíso	Santiago	30202
Cartago	Paraíso	Orosi	30203
Cartago	Paraíso	Cachí	30204
Cartago	Paraíso	Llanos de Santa Lucía	30205
Cartago	La Unión	Tres Ríos	30301
Cartago	La Unión	San Diego	30302
Cartago	La Unión	San Juan	30303
Cartago	La Unión	San Rafael	30304
Cartago	La Unión	Concepción	30305
Cartago	La Unión	Dulce Nombre	30306
Cartago	La Unión	San Ramón	30307
Cartago	La Unión	Río Azul	30308
Cartago	Jiménez	Juan Viñas	30401
Cartago	Jiménez	Tucurrique	30402
Cartago	Jiménez	Pejibaye	30403
Cartago	Turrialba	Turrialba	30501
Cartago	Turrialba	La Suiza	30502
Cartago	Turrialba	Peralta	30503
Cartago	Turrialba	Santa Cruz	30504
Cartago	Turrialba	Santa Teresita	30505
Cartago	Turrialba	Pavones	30506
Cartago	Turrialba	Tuis	30507
Cartago	Turrialba	Tayutic	30508
Cartago	Turrialba	Santa Rosa	30509
Cartago	Turrialba	Tres Equis	30510
Cartago	Turrialba	La Isabel	30511
Cartago	Turrialba	Chirripó	30512
Cartago	Alvarado	Pacayas	30601
Cartago	Alvarado	Cervantes	30602
Cartago	Alvarado	Capellades	30603
Cartago	Oreamuno	San Rafael	30701
Cartago	Oreamuno	Cot	30702
Cartago	Oreamuno	Potrero Cerrado	30703
Cartago	Oreamuno	Cipreses	30704
Cartago	Oreamuno	Santa Rosa	30705
Cartago	El Guarco	Tejar	30801
Cartago	El Guarco	San Isidro	30802
Cartago	El Guarco	Tobosi	30803
Cartago	El Guarco	Patio de Agua	30804
Heredia	Heredia	Heredia	40101
Heredia	Heredia	Mercedes	40102
Heredia	Heredia	San Francisco	40103
Heredia	Heredia	Ulloa	40104
Heredia	Heredia	Varablanca	40105
Heredia	Barva	Barva	40201
Heredia	Barva	San Pedro	40202
Heredia	Barva	San Pablo	40203
Heredia	Barva	San Roque	40204
Heredia	Barva	Santa Lucía	40205
Heredia	Barva	San José de la Montaña	40206
Heredia	Santo Domingo	Santo Domingo	40301
Heredia	Santo Domingo	San Vicente	40302
Heredia	Santo Domingo	San Miguel	40303
Heredia	Santo Domingo	Paracito	40304
Heredia	Santo Domingo	Santo Tomás	40305
Heredia	Santo Domingo	Santa Rosa	40306
Heredia	Santo Domingo	Tures	40307
Heredia	Santo Domingo	Para	40308
Heredia	Santa Bárbara	Santa Bárbara	40401
Heredia	Santa Bárbara	San Pedro	40402
Heredia	Santa Bárbara	San Juan	40403
Heredia	Santa Bárbara	Jesús	40404
Heredia	Santa Bárbara	Santo Domingo	40405
Heredia	Santa Bárbara	Puraba	40406
Heredia	San Rafael	San Rafael	40501
Heredia	San Rafael	San Josécito	40502
Heredia	San Rafael	Santiago	40503
Heredia	San Rafael	Ángeles	40504
Heredia	San Rafael	Concepción	40505
Heredia	San Isidro	San Isidro	40601
Heredia	San Isidro	San José	40602
Heredia	San Isidro	Concepción	40603
Heredia	San Isidro	San Francisco	40604
Heredia	Belén	San Antonio	40701
Heredia	Belén	La Ribera	40702
Heredia	Belén	La Asunción	40703
Heredia	Flores	San Joaquín	40801
Heredia	Flores	Barrantes	40802
Heredia	Flores	Llorente	40803
Heredia	San Pablo	San Pablo	40901
Heredia	San Pablo	Rincón de Sabanilla	40902
Heredia	Sarapiquí	Puerto Viejo	41001
Heredia	Sarapiquí	La Virgen	41002
Heredia	Sarapiquí	Horquetas	41003
Heredia	Sarapiquí	Llanuras del Gaspar	41004
Heredia	Sarapiquí	Cureña	41005
Guanacaste	Liberia	Liberia	50101
Guanacaste	Liberia	Cañas Dulces	50102
Guanacaste	Liberia	Mayorga	50103
Guanacaste	Liberia	Nacascolo	50104
Guanacaste	Liberia	Curubandé	50105
Guanacaste	Nicoya	Nicoya	50201
Guanacaste	Nicoya	Mansion	50202
Guanacaste	Nicoya	San Antonio	50203
Guanacaste	Nicoya	Quebrada Honda	50204
Guanacaste	Nicoya	Samara	50205
Guanacaste	Nicoya	Nosara	50206
Guanacaste	Nicoya	Belén de Nosarita	50207
Guanacaste	Santa Cruz	Santa Cruz	50301
Guanacaste	Santa Cruz	Bolsón	50302
Guanacaste	Santa Cruz	Veintisiete de Abril	50303
Guanacaste	Santa Cruz	Tempate	50304
Guanacaste	Santa Cruz	Cartagena	50305
Guanacaste	Santa Cruz	Cuajiniquil	50306
Guanacaste	Santa Cruz	Diria	50307
Guanacaste	Santa Cruz	Cabo Velas	50308
Guanacaste	Santa Cruz	Tamarindo	50309
Guanacaste	Bagaces	Bagaces	50401
Guanacaste	Bagaces	Fortuna	50402
Guanacaste	Bagaces	Mogote	50403
Guanacaste	Bagaces	Río Naranjo	50404
Guanacaste	Carrillo	Filadelfia	50501
Guanacaste	Carrillo	Palmira	50502
Guanacaste	Carrillo	Sardinal	50503
Guanacaste	Carrillo	Belén	50504
Guanacaste	Cañas	Cañas	50601
Guanacaste	Cañas	Palmira	50602
Guanacaste	Cañas	San Miguel	50603
Guanacaste	Cañas	Bebedero	50604
Guanacaste	Cañas	Porozal	50605
Guanacaste	Abangares	Juntas	50701
Guanacaste	Abangares	Sierra	50702
Guanacaste	Abangares	San Juan	50703
Guanacaste	Abangares	Colorado	50704
Guanacaste	Tilarán	Tilarán	50801
Guanacaste	Tilarán	Quebrada Grande	50802
Guanacaste	Tilarán	Tronadora	50803
Guanacaste	Tilarán	Santa Rosa	50804
Guanacaste	Tilarán	Líbano	50805
Guanacaste	Tilarán	Tierras Morenas	50806
Guanacaste	Tilarán	Arenal	50807
Guanacaste	Nandayure	Carmona	50901
Guanacaste	Nandayure	Santa Rita	50902
Guanacaste	Nandayure	Zapotal	50903
Guanacaste	Nandayure	San Pablo	50904
Guanacaste	Nandayure	Porvenir	50905
Guanacaste	Nandayure	Bejuco	50906
Guanacaste	La Cruz	La Cruz	51001
Guanacaste	La Cruz	Santa Cecilia	51002
Guanacaste	La Cruz	Garita	51003
Guanacaste	La Cruz	Santa Elena	51004
Guanacaste	Hojancha	Hojancha	51101
Guanacaste	Hojancha	Monte Romo	51102
Guanacaste	Hojancha	Puerto Carrillo	51103
Guanacaste	Hojancha	Huacas	51104
Puntarenas	Puntarenas	Puntarenas	60101
Puntarenas	Puntarenas	Pitahaya	60102
Puntarenas	Puntarenas	Chomes	60103
Puntarenas	Puntarenas	Lepanto	60104
Puntarenas	Puntarenas	Paquera	60105
Puntarenas	Puntarenas	Manzanillo	60106
Puntarenas	Puntarenas	Guacimal	60107
Puntarenas	Puntarenas	Barranca	60108
Puntarenas	Puntarenas	Monte Verde	60109
Puntarenas	Puntarenas	Isla del Coco	60110
Puntarenas	Puntarenas	Cobano	60111
Puntarenas	Puntarenas	Chacarita	60112
Puntarenas	Puntarenas	Chira	60113
Puntarenas	Puntarenas	Acapulco	60114
Puntarenas	Puntarenas	El Roble	60115
Puntarenas	Puntarenas	Arancibia	60116
Puntarenas	Esparza	Espiritu Santo	60201
Puntarenas	Esparza	San Juan Grande	60202
Puntarenas	Esparza	Macacona	60203
Puntarenas	Esparza	San Rafael	60204
Puntarenas	Esparza	San Jerónimo	60205
Puntarenas	Esparza	Caldera	60206
Puntarenas	Buenos Aires	Buenos Aires	60301
Puntarenas	Buenos Aires	Volcan	60302
Puntarenas	Buenos Aires	Potrero Grande	60303
Puntarenas	Buenos Aires	Boruca	60304
Puntarenas	Buenos Aires	Pilas	60305
Puntarenas	Buenos Aires	Colinas	60306
Puntarenas	Buenos Aires	Changena	60307
Puntarenas	Buenos Aires	Briolley	60308
Puntarenas	Buenos Aires	Brunka	60309
Puntarenas	Montes de Oro	Miramar	60401
Puntarenas	Montes de Oro	La Unión	60402
Puntarenas	Montes de Oro	San Isidro	60403
Puntarenas	Osa	Puerto Cortés	60501
Puntarenas	Osa	Palmar	60502
Puntarenas	Osa	Sierpe	60503
Puntarenas	Osa	Bahia Ballena	60504
Puntarenas	Osa	Piedras Blancas	60505
Puntarenas	Osa	Bahía Drake	60506
Puntarenas	Quepos	Quepos	60601
Puntarenas	Quepos	Savegre	60602
Puntarenas	Quepos	Naranjito	60603
Puntarenas	Golfito	Golfito	60701
Puntarenas	Golfito	Puerto Jiménez	60702
Puntarenas	Golfito	Guaycará	60703
Puntarenas	Golfito	Pavón	60704
Puntarenas	Coto Brus	San Vito	60801
Puntarenas	Coto Brus	Sabalito	60802
Puntarenas	Coto Brus	Aguabuena	60803
Puntarenas	Coto Brus	Limóncito	60804
Puntarenas	Coto Brus	Pittier	60805
Puntarenas	Coto Brus	Gutiérrez Braun	60806
Puntarenas	Parrita	Parrita	60901
Puntarenas	Corredores	Corredor	61001
Puntarenas	Corredores	La Cuesta	61002
Puntarenas	Corredores	Canoas	61003
Puntarenas	Corredores	Laurel	61004
Puntarenas	Garabito	Jacó	61101
Puntarenas	Garabito	Tarcoles	61102
Limón	Limón	Limón	70101
Limón	Limón	Valle La Estrella	70102
Limón	Limón	Río Blanco	70103
Limón	Limón	Matama	70104
Limón	Pococí	Guapiles	70201
Limón	Pococí	Jiménez	70202
Limón	Pococí	La Rita	70203
Limón	Pococí	Roxana	70204
Limón	Pococí	Cariari	70205
Limón	Pococí	Colorado	70206
Limón	Pococí	La Colonia	70207
Limón	Siquirres	Siquirres	70301
Limón	Siquirres	Pacuarito	70302
Limón	Siquirres	Florida	70303
Limón	Siquirres	Germania	70304
Limón	Siquirres	Cairo	70305
Limón	Siquirres	Alegría	70306
Limón	Talamanca	Bratsi	70401
Limón	Talamanca	Sixaola	70402
Limón	Talamanca	Cahuita	70403
Limón	Talamanca	Telire	70404
Limón	Matina	Matina	70501
Limón	Matina	Batán	70502
Limón	Matina	Carrandi	70503
Limón	Guácimo	Guácimo	70601
Limón	Guácimo	Mercedes	70602
Limón	Guácimo	Pocora	70603
Limón	Guácimo	Río Jiménez	70604
Limón	Guácimo	Duacarí	70605*/