$('#frmAddLibrary').on('submit', function (event) {
  event.preventDefault();

  let formData = new FormData(this);
  let image = '';
  let jsonData = {};

  if ($('#image_preview').attr('src') != '../img/image-default.png') {
    image = $('#image_preview').attr('src');
  }

  formData.append('image', image);

  for (const [key, value] of formData.entries()) {
    jsonData[key] = value;
  }

  $.ajax({
    url: '/api/library',
    type: 'POST',
    data: JSON.stringify(jsonData),
    contentType: 'application/json',
    cache: false,
    processData: false,
    beforeSend: function () {
      $('#btnSubmit').prop('disabled', true);
    },
    success: function (data) {
      $('#frmAddLibrary').trigger('reset');
      $('.box-alert ul').empty();
      $('.box-alert').hide();
      $('#image_preview').attr('src', '../img/image-default.png');
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
          text: 'Ha ocurrido un error desconocido al registrar la libreria',
          type: 'error',
          confirmButtonText: 'Ok'
        });
      }
    }
  });

  $('#btnSubmit').prop('disabled', false);
});

$('#frmEditLibrary').on('submit', function (event) {
  event.preventDefault();

  let urlString = window.location.href;
  let url = new URL(urlString);
  let id = url.searchParams.get('id');

  let formData = new FormData(this);
  let image = '';
  let jsonData = {};

  if ($('#image_preview').attr('src') != '../img/image-default.png') {
    image = $('#image_preview').attr('src');
  }

  formData.append('_id', id);
  formData.append('image', image);

  for (const [key, value] of formData.entries()) {
    jsonData[key] = value;
  }

  console.log(jsonData);

  $.ajax({
    url: '/api/library/' + id,
    type: 'PUT',
    data: JSON.stringify(jsonData),
    contentType: 'application/json',
    cache: false,
    processData: false,
    beforeSend: function () {
      $('#btnSubmit').prop('disabled', true);
    },
    success: function (data) {
      $('#frmEditLibrary').trigger('reset');
      $('.box-alert ul').empty();
      $('.box-alert').hide();
      $('#image_preview').attr('src', '../img/image-default.png');
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
          text: 'Ha ocurrido un error desconocido al editar la información de la libreria',
          type: 'error',
          confirmButtonText: 'Ok'
        });
      }
    }
  });

  $('#btnSubmit').prop('disabled', false);
});

$('#btnSearch').click(function (event) {
  loadLibraries($('#txtSearch').val());
});

$('#txtSearch').keypress(function (event) {
  let keycode = (event.keyCode ? event.keyCode : event.which);

  if (keycode == 13) {
    loadLibraries($('#txtSearch').val());
  }
});

function loadLibraries(searchText) {
  let param = {};

  if (searchText && searchText != '') {
    param = { search: searchText }
  }

  $.get('/api/library', param)
    .done(function (libraries) {
      libraries.map(function (key, index) {
        if (key.image == undefined || key.image == '') {
          key.image = '../img/image-default.png'
        } else {
          key.image = key.image;
        }
      });

      $('#libraries').empty();
      $('#libraryTemplate').tmpl(libraries).appendTo('#libraries');
    }).fail(function (response) {
      $('#libraries').empty();
      $('#emptylibraryTemplate').tmpl({}).appendTo('#libraries');
    });
}

function loadLibrary() {
  let urlString = window.location.href;
  let url = new URL(urlString);
  let id = url.searchParams.get('id');

  $.get('/api/library/' + id)
    .done(function (library) {
      if (library.image == undefined || library.image == '') {
        library.image = '../img/image-default.png'
      } else {
        library.image = library.image;
      }

      $('#library').empty();
      $('#libraryTemplate').tmpl(library).appendTo('#library');
      mapaEdicion(library.location);
    }).fail(function (response) {
      $('#library').empty();
      $('#emptylibraryTemplate').tmpl({}).appendTo('#library');
    });
}

function loadLibraryForEdit() {
  let urlString = window.location.href;
  let url = new URL(urlString);
  let id = url.searchParams.get('id');

  $.get('/api/library/' + id)
    .done(function (library) {
      console.log(library);

      if (library.image == undefined || library.image == '') {
        library.image = '../img/image-default.png'
      } else {
        library.image = library.image;
      }

      $('#province option[value="' + library.province + '"]').attr('selected', 'selected');

      $('#county').append($('<option>', {
        value:  library.county,
        text: library.county
      }));
      $('#county option[value="' + library.county + '"]').attr('selected', 'selected');
      
      $('#district').append($('<option>', {
        value: library.district,
        text: library.district
      }));
      $('#district option[value="' + library.district + '"]').attr('selected', 'selected');

      $('#commercialName').val(library.commercialName);
      $('#brandName').val(library.brandName);
      $('#address').val(library.address);
      $('#location').val(library.location);
      $('#image_preview').attr('src', library.image);
      $('#userid').val(library.admin[0]._id);
      $('#firstName').val(library.admin[0].firstName);
      $('#middleName').val(library.admin[0].middleName);
      $('#firstLastName').val(library.admin[0].firstLastName);
      $('#secondLastName').val(library.admin[0].secondLastName);
      $('#idType option[value=' + library.admin[0].idType + ']').attr('selected', 'selected');
      $('#id').val(library.admin[0].id);
      $('#gender option[value=' + library.admin[0].gender + ']').attr('selected', 'selected');
      $('#birthDate').val(library.admin[0].birthDate);
      $('#email').val(library.admin[0].email);
      $('#password').val(library.admin[0].password);

      mapaEdicion(library.location);
    }).fail(function (response) {
      $('.box-alert ul').append('<li>Ha ocurrido un error a cargar la librería seleccionada</li>');
      $(window).scrollTop(0);
      $('.box-alert').show();
    });
}

$('#idType').change(function () {
  switch ($(this).val()) {
    case 'nacional': $('#id').mask('0-0000-0000', { placeholder: '0-0000-0000' }); break;
    case 'residente': $('#id').mask('0-000-000000', { placeholder: '0-000-000000' }); break;
    case 'nacionalizado': $('#id').mask('0-0000-0000', { placeholder: '0-0000-0000' }); break;
    case 'extranjero': $('#id').mask('000000000000', { placeholder: '000000000000' }); break;
    default: break;
  }
});
