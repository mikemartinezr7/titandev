$(document).ready(function () {
  $.get('/api/user/session').fail(function (response) {
    window.location.href = 'http://' + window.location.host + '/users/signin.html';
  });
});

$('#leftmenu').mouseenter(function () {
  $('#leftmenu').addClass('left-menu-open');
  $('#leftmenu').removeClass('left-menu-close');
  $('.left-menu-item-text').show();
}).mouseleave(function () {
  $('#leftmenu').addClass('left-menu-close');
  $('#leftmenu').removeClass('left-menu-open');
  $('.left-menu-item-text').hide();
});

$('#user-profile-trigger').click(function () {
  $('#profile-menu').show();
}).blur(function () {
  $('#profile-menu').hide();
});