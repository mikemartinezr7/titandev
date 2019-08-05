function validateDate(d) {
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

function isValidData() {
 let isValid = true;

  $('.required').each(function(index) { 
    if ($(this).val() == '') {
      isValid = false;
      $(this).addClass('error');
    } else {
      $(this).removeClass('error');
    }
  });

  console.log(isValid);
  return isValid;
}

$('#btnSubmit').click(function (event) {
  event.preventDefault();

  if (isValidData()) {
    let data = $('#frmAddUser').serialize();

    var request = $.post('/api/library', data)
      .done(function () {
        console.log('Done');
      })
      .fail(function () {
        console.log('fail');
      });
  }
});