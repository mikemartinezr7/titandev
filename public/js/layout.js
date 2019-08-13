$('#leftmenu').mouseenter(function () {
  $('#leftmenu').addClass('left-menu-open');
  $('#leftmenu').removeClass('left-menu-close');
  $('.left-menu-toggle').html('<<');
  $('.left-menu-item-text').show();
  $('#leftmenu').addClass('left-menu-open');
}).mouseleave(function () {
  $('#leftmenu').addClass('left-menu-close');
  $('#leftmenu').removeClass('left-menu-open');
  $('.left-menu-toggle').html('>>');
  $('.left-menu-item-text').hide();
});

$(window).on('load', function () {
  $('#leftmenu, #content').height($(window).height() - $('#topmenu-container').height())
}).on('resize', function () {
  $('#leftmenu, #content').height($(window).height() - $('#topmenu-container').height())
});

function showNotification(message, type) {
  let info = {
    message : message,
    type: type
  }
  
  $('#notifications').empty();
  $('#notificationTemplate').tmpl(info).appendTo('#notifications');
  console.log(info);
}