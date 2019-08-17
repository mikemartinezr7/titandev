function isValidDate(d) {
  if (Object.prototype.toString.call(d) === "[object Date]") {
    if (isNaN(d.getTime())) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
}

function isValidEmail(email) {
  var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
}

function isValidData() {
  let isValid = true;

  $('.required').each(function (index) {
    let value = $(this).val();

    if (value == '') {
      isValid = false;
      $(this).addClass('error');
    } else {
      if ((!isValidDate(value)) && ($(this).hasClass('date'))) {
        isValid = false;
        $(this).addClass('error');
      } else {
        $(this).removeClass('error');
      }

      if ((!isValidEmail(value)) && ($(this).hasClass('email'))) {
        isValid = false;
        $(this).addClass('error');
      } else {
        $(this).removeClass('error');
      }
    }
  });

  return isValid;
}

$('#frmAddUser').on('submit', function (event) {
  event.preventDefault();

  //if (isValidData()) {
    $.ajax({
      url: '/api/library',
      type: 'POST',
      data: new FormData(this),
      contentType: false,
      cache: false,
      processData: false,
      beforeSend: function () {
        $('#btnSubmit').prop('disabled', true);
      },
      success: function (data) {
        console.log('success');
        $('#btnSubmit').prop('disabled', false);
      },
      error: function (response) {
        let errors = response.responseJSON.errors || [];

        if (errors && errors.length > 0) {
          $('.box-alert ul').empty();
          
          $('.error').each(function(index) {
            $(this).removeClass('error');
          });

          errors.map(function(key, index) {
            $('.box-alert ul').append('<li>' + key.message + '</li>');
            $('#' + key.field).addClass('error');
          });
          
          $(window).scrollTop(0);
          $('.box-alert').show();
          $('#btnSubmit').prop('disabled', false);
        } else {
          alert(res);
        }
      }
    });
  //}
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
      $('#libraries').empty();
      $('#libraryTemplate').tmpl(libraries).appendTo('#libraries');
    }).fail(function (response) {
      $('#libraries').empty();
      $('#emptylibraryTemplate').tmpl({}).appendTo('#libraries');
    });
}