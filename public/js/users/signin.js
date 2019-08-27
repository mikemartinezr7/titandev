
$('#frmLogin').on('submit', function (event) {
  event.preventDefault();

  let formData = new FormData(this);
  let jsonData = {};

  for (const [key, value] of formData.entries()) {
    jsonData[key] = value;
  }

  $.ajax({
    url: '/api/user/login',
    type: 'POST',
    data: JSON.stringify(jsonData),
    contentType: 'application/json',
    cache: false,
    processData: false,
    beforeSend: function () {
      $('#btnLogin').prop('disabled', true);
    },
    success: function (data) {
      $('#btnLogin').prop('disabled', false);
      window.location.href = 'http://' + window.location.host;
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
        $('#btnLogin').prop('disabled', false);
      }
    }
  });
});
