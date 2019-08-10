$('.left-menu-toggle').click(function () {
  if ($('#leftmenu').hasClass('left-menu-open')) {
    $('#leftmenu').addClass('left-menu-close');
    $('#leftmenu').removeClass('left-menu-open');
    $('.left-menu-toggle').html('>>');
    $('.left-menu-item-text').hide();1
  } else if ($('#leftmenu').hasClass('left-menu-close')) {
    $('#leftmenu').addClass('left-menu-open');
    $('#leftmenu').removeClass('left-menu-close');
    $('.left-menu-toggle').html('<<');
    $('.left-menu-item-text').show();
  }
});

$(window).on('load', function () {
  $('#leftmenu').height($(window).height() - $('#topmenu-container').height())
}).on('resize', function () {
  $('#leftmenu').height($(window).height() - $('#topmenu-container').height())
});

$('.notification-close').click(function () {
  $(this).parent().hide();
});

function showNotification(message, type) {
  let style = '';

  switch (type) {
    case 'success': style = '.success'
    case 'danger' : style = '.danger'
    default: style = '.danger';
  }  

  let info = {
    message : message,
    type: style
  }
  
  $('#notifications').empty();
  $('#notificationTemplate').tmpl(info).appendTo('#notifications');
}