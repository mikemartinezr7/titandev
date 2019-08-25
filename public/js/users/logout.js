$(document).ready(function () {
  $.get('/api/user/logout')
    .fail(function (response) {
      console.log(response);
    }).done(function (response) {
      $('.login-box').html(response.message);
      window.location.href = 'http://' + window.location.host + '/users/signin.html';
    });
});