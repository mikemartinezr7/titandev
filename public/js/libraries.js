function validation() {

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