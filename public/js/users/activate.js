$('#frmActivateUser').on('submit', function (event) {
  event.preventDefault();

  let formData = new FormData(this);
  let jsonData = {};

  for (const [key, value] of formData.entries()) {
    jsonData[key] = value;
  }

  $.ajax({
    url: '/api/user/activate',
    type: 'POST',
    data: JSON.stringify(jsonData),
    contentType: 'application/json',
    cache: false,
    processData: false,
    beforeSend: function () {
      $('#btnActivate').prop('disabled', true);
    },
    success: function (data) {
      $('.login-box-alert ul').empty();
      $('.login-box-alert').hide();

      Swal.fire({
        title: 'Bienvenido',
        text: 'El usuario ha sido activado corectamente. Ingrese sus datos de ingreso en la página de Inicio de sesión',
        type: 'success',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Entendido'
      }).then(function (result) {
        window.location.href = 'http://' + window.location.host + '/users/signin.html';
        //window.location.href = '/users/signin.html';
      });
    },
    error: function (response) {
      let errors = [];

      if (response.hasOwnProperty('responseJSON')) {
        errors = response.responseJSON;
      }

      if (errors && errors.length > 0) {
        $('.login-box-alert ul').empty();

        $('.error').each(function (index) {
          $(this).removeClass('error');
        });

        errors.map(function (key, index) {
          $('.login-box-alert ul').append('<li>' + key.message + '</li>');
          $('#' + key.field).addClass('error');
        });

        $('.login-box-alert').show();
      }
    }
  });

  $('#btnActivate').prop('disabled', false);
});

$(document).ready(function () {
  $('#randomToken').mask('000000', { placeholder: '000000' })
});