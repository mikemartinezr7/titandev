'use strict';

//Variables para registro de usuario

let buttonRegister = document.querySelector('#btnRegister');
let inputFirstName = document.querySelector('#txtFirstName');
let inputMiddleName = document.querySelector('#txtMiddleName');
let inputLastName = document.querySelector('#txtLastName');
let inputSecondLastName = document.querySelector('#txtSecondLastName');
let inputGender = document.querySelector('#sltGender');
let inputID = document.querySelector('#txtID');
var inputEmail = document. querySelector ('#txtEmail');
let inputProvince = document.querySelector('#sltProvince');
let inputCounty = document.querySelector('#sltCounty');
let inputDistrict = document.querySelector('#sltDistrict');
let inputAdditionalDetails = document.querySelector('#txtAdditionalDetails');
let inputFiction = document.querySelector('#fiction');
let inputTerror = document.querySelector('#terror');
let inputComedy = document.querySelector('#comedy');
let inputDrama = document.querySelector('#drama');
let inputTragedy = document.querySelector('#tragedy');
let inputRomance = document.querySelector('#romance');
let inputNovel = document.querySelector('#novel');
let inputStory = document.querySelector('#story');
let inputThriller = document.querySelector('#thriller');
let inputTale = document.querySelector('#tale');
let inputDidacticNovel = document.querySelector('#didacticNovel');
let inputFavoriteBook = document.querySelector('#txtFavoriteBook');
let inputFavoriteAuthor = document.querySelector('#txtFavoriteAuthor');
let inputNickname = document.querySelector('#txtNickname');
let inputAvatar = document.querySelector('#upload-file');
let inputExchange = document.querySelector('#Exchange');


//Cuando se hace click en #choose-button, se hace click en #upload-file
document.querySelector('#choose-button').addEventListener('click', function() {
	document.querySelector('#upload-file').click();
});

//Cuando se hace click en buttonRegister, se llama a la función register_user
buttonRegister.addEventListener('click',register_user);


//Registro de usuario (valida datos y responde con éxito o error)
function register_user(){

    //Registra el arreglo de géneros favoritos
    let FavoriteGenre = [];
    let i = 0;

    if(inputFiction.checked == true){
        let Fiction = "5d45b9d26ec5d72d90bbcb46";
        FavoriteGenre [i] = Fiction;
        i ++
    }
    if(inputTerror.checked == true){
        let Terror = "5d45b9ed6ec5d72d90bbcb47";
        FavoriteGenre [i] = Terror;
        i ++
    } 
    if(inputComedy.checked == true){
        let Comedy = "5d45b9f56ec5d72d90bbcb48";
        FavoriteGenre [i] = Comedy;
        i ++
    }
    if(inputDrama.checked == true){
        let Drama = "5d45b9fc6ec5d72d90bbcb49";
        FavoriteGenre [i] = Drama;
        i ++
    }
    if(inputTragedy.checked == true){
        let Tragedy = "5d45ba026ec5d72d90bbcb4a";
        FavoriteGenre [i] = Tragedy;
        i ++
    }
    if(inputRomance.checked == true){
        let Romance = "5d45ba076ec5d72d90bbcb4b";
        FavoriteGenre [i] = Romance;
        i ++
    }
    if(inputNovel.checked == true){
        let Novel = "5d45ba0c6ec5d72d90bbcb4c";
        FavoriteGenre [i] = Novel;
        i ++
    }
    if(inputStory.checked == true){
        let Story = "5d45ba116ec5d72d90bbcb4d";
        FavoriteGenre [i] = Story;
        i ++
    }
    if(inputThriller.checked == true){
        let Thriller = "5d45ba166ec5d72d90bbcb4e";
        FavoriteGenre [i] = Thriller;
        i ++
    }
    if(inputTale.checked == true){
        let Tale = "5d45ba1c6ec5d72d90bbcb4f";
        FavoriteGenre [i] = Tale;
        i ++
    }
    if(inputDidacticNovel.checked == true){
        let DidacticNovel = "5d45ba276ec5d72d90bbcb50";
        FavoriteGenre [i] = DidacticNovel;
    }

    //Recupera los valores ingresados
    let FirstName = inputFirstName.value;
    let MiddleName = inputMiddleName.value;
    let LastName = inputLastName.value;
    let SecondLastName = inputSecondLastName.value;
    let Gender = inputGender.value;
    let ID = inputID.value;
    let Email = inputEmail.value;
    let Province = inputProvince.value;
    let County = inputCounty.value;
    let District = inputDistrict.value;
    let AdditionalDetails = inputAdditionalDetails.value;
    let FavoriteBook = inputFavoriteBook.value;
    let FavoriteAuthor = inputFavoriteAuthor.value;
    let Nickname = inputNickname.value;
    let Avatar = inputAvatar.files[0];
    let Exchange = inputExchange.checked;

    let bError = false;

    bError = validate(FirstName,LastName,Gender,ID,Email,Province,County,District,AdditionalDetails,FavoriteGenre);
 
    if(bError == false){
        register(FirstName,MiddleName,LastName,SecondLastName,Gender,ID,Email,Province,County,District,AdditionalDetails,FavoriteGenre,FavoriteBook,FavoriteAuthor,Nickname,Avatar,Exchange);
        console.log("¡Usuario registrado!");
    }else{
        console.log("Corrija los errores");
    }
}

//Registrar en la base de datos

function register(pFirstName,pMiddleName,pLastName,pSecondLastName,pGender,pID,pEmail,pProvince,pCounty,pDistrict,pAdditionalDetails,pFavoriteGenre,pFavoriteBook,pFavoriteAuthor,pNickname,pAvatar,pExchange){
    let request = $.ajax({
        url : '/api/user',
        method : "POST",
        data : {
            firstName : pFirstName,
            middleName : pMiddleName,
            firstLastName : pLastName,
            secondLastName : pSecondLastName,
            gender : pGender,
            id : pID,
            province : pProvince,
            county : pCounty,
            district : pDistrict,
            additionalDetails : pAdditionalDetails,
            favoriteGenres : pFavoriteGenre,
            favoriteBook : pFavoriteBook,
            favoriteAuthor : pFavoriteAuthor,
            email : pEmail,
            avatar : pAvatar,
            nickname : pNickname,
            type : "client",
            exchange : pExchange
        },
        dataType : "json",
        contentType : 'application/x-www-form-urlencoded; charset=UTF-8' 
    });
    request.done(function(response){
        console.log(response);
    });
    request.fail(function(){
    });
};

//Validar la información ingresada

function validate(pFirstName,pLastName,pGender,pID,pEmail,pProvince,pCounty,pDistrict,pAdditionalDetails,pFavoriteGenre){

    let bError = false;

    if(pFirstName == ""){
        bError = true
        inputFirstName.classList.add('error')
    }else{
        inputFirstName.classList.remove('error')
    }
    if(pLastName == ""){
        bError = true
        inputLastName.classList.add('error')
    }else{
        inputLastName.classList.remove('error')
    }
    if(pGender == ""){
        bError = true
        inputGender.classList.add('error')
    }else{
        inputGender.classList.remove('error')
    }
    if(pID == ""){
        bError = true
        inputID.classList.add('error')
    }else{
        inputID.classList.remove('error')
    }
    if(pEmail == ""){
        bError = true
        inputEmail.classList.add('error')
    }else{
        inputEmail.classList.remove('error')
    }
    if(pProvince == ""){
        bError = true
        inputProvince.classList.add('error')
    }else{
        inputProvince.classList.remove('error')
    }
    if(pCounty == ""){
        bError = true
        inputCounty.classList.add('error')
    }else{
        inputCounty.classList.remove('error')
    }
    if(pDistrict == ""){
        bError = true
        inputDistrict.classList.add('error')
    }else{
        inputDistrict.classList.remove('error')
    }
    if(pAdditionalDetails == ""){
        bError = true
        inputAdditionalDetails.classList.add('error')
    }else{
        inputAdditionalDetails.classList.remove('error')
    }
    if(pFavoriteGenre.length == 0){
        bError = true
    }
    return bError;
}