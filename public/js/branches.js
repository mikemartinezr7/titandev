$('#frmAddBranch').on('submit', function (event) {
  event.preventDefault();

  let formData = new FormData(this);
  let jsonData = {};

  let urlString = window.location.href;
  let url = new URL(urlString);
  let paramId = url.searchParams.get('id');

  formData.append('library', paramId);

  for (const [key, value] of formData.entries()) {
    jsonData[key] = value;
  }
  
  $.ajax({
    url: '/api/library/' + paramId + '/branch',
    type: 'POST',
    data: JSON.stringify(jsonData),
    contentType: 'application/json',
    cache: false,
    processData: false,
    beforeSend: function () {
      $('#btnSubmit').prop('disabled', true);
    },
    success: function (data) {
      $('#frmAddBranch').trigger('reset');
      $('.box-alert ul').empty();
      $('.box-alert').hide();
      $(window).scrollTop(0);

      Swal.fire({
        title: 'Felicidades',
        text: data.message,
        type: 'success',
        confirmButtonText: 'Ok'
      });
    },
    error: function (response) {
      let errors = [];

      if (response.hasOwnProperty('responseJSON')) {
        errors = response.responseJSON.errors;
      }

      if (errors && errors.length > 0) {
        $('.box-alert ul').empty();

        $('.error').each(function (index) {
          $(this).removeClass('error');
        });

        errors.map(function (key, index) {
          $('.box-alert ul').append('<li>' + key.message + '</li>');
          $('#' + key.field).addClass('error');
        });

        $(window).scrollTop(0);
        $('.box-alert').show();
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Ha ocurrido un error desconocido al registrar la sucursal',
          type: 'error',
          confirmButtonText: 'Ok'
        });
      }
    }
  });

  $('#btnSubmit').prop('disabled', false);
});
