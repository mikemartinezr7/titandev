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

function validation() {
  let isValid = true;

  if ($('#txtComercialName').val() == '') {
    isValid = false;
    
  }

  return isValid;
}

$('#btnSubmit').click(function (event) {
  event.preventDefault();




  console.log('Submit clicked');
  let data = $('#frmAddUser').serialize();

  var request = $.post('/api/library', data)
    .done(function() {
      console.log('Done');
    })
    .fail(function () {
      console.log('fail');
    });
});