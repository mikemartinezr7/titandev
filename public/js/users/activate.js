
/*inputToken.classList.add('error');
$('.login-box-alert ul').html('<li>El PIN digitado es incorrecto</li>');
$('.login-box-alert').show();*/

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
      console.log(data);
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


