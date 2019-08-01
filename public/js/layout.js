$('.left-menu-toggle').click(function() {
    if ($('#leftmenu').hasClass('left-menu-open')) {
        $('#leftmenu').addClass('left-menu-close');
        $('#leftmenu').removeClass('left-menu-open');
        $('.left-menu-toggle').html('>>');
        $('.left-menu-item-text').hide();
    } else if ($('#leftmenu').hasClass('left-menu-close')) {
        $('#leftmenu').addClass('left-menu-open');
        $('#leftmenu').removeClass('left-menu-close');
        $('.left-menu-toggle').html('<<');
        $('.left-menu-item-text').show();
    }
});