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

$('#btnSubmit').click(function (event) {
  event.preventDefault();

  if (isValidData()) {
    let data = $('#frmAddUser').serialize();

    const request = $.post('/api/library', data)
      .done(function (response) {
        if (response.success && response.success == true) {
          $('#frmAddUser').trigger('reset');
          console.log('Libreria registrada correctamente');
        } else {
          console.log('Error en datos de libreria')
        }
      })
      .fail(function (response) {
        console.log('Fail');
        console.log(response);
      });
  }
});

$('#btnSearch').click(function (event) {
  loadLibraries($('#txtSearch').val());
});

$('#txtSearch').keypress(function(event){
  let keycode = (event.keyCode ? event.keyCode : event.which);
  
  if (keycode == 13) {
    loadLibraries($('#txtSearch').val());
  }
});

function loadLibraries( searchText) {
  let param = {};

  if (searchText && searchText != '') {
    param = { search: searchText }
  }
  
  $.get('/api/library', param)
  .done(function(libraries) {
    $('#libraries').empty();
    $('#libraryTemplate').tmpl(libraries).appendTo('#libraries');
  }).fail(function (response) {
    $('#libraries').empty();
    $('#emptylibraryTemplate').tmpl({}).appendTo('#libraries');
  });
}