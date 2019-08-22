$('#leftmenu').mouseenter(function () {
  $('#leftmenu').addClass('left-menu-open');
  $('#leftmenu').removeClass('left-menu-close');
  $('.left-menu-item-text').show();
}).mouseleave(function () {
  $('#leftmenu').addClass('left-menu-close');
  $('#leftmenu').removeClass('left-menu-open');
  $('.left-menu-item-text').hide();
});

/*$(window).on('load', function () {
  $('#leftmenu, #content').height($(document).height() - $('#topmenu-container').height());
});*/

$('#user-profile-trigger').click(function () {
  $('#profile-menu').show();
}).blur(function () {
  $('#profile-menu').hide();
});

/*let resizeId;
$(window).resize(function () {
  clearTimeout(resizeId);
  resizeId = setTimeout(doneResizing, 500);
});

function doneResizing() {
  $('#leftmenu, #content').height($(document).height() - $('#topmenu-container').height());
}*/