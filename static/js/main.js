const $fixedMenu = $('.fixed.menu');
const $fixedItem = $('.fixed.item');
const $mobileMenuTitle = $('.ui.fixed.menu.mobile .item.header div.content');
const $mobileMenu = $('.sidebar.icon,.close.icon');
const $mobileItems = $('.closed');

$(document).ready(function () {
    $('#title').visibility({
        once: false,
        onTopPassed: function () {
            $('.close.icon').addClass('sidebar').css({'opacity': '0'});
            $('.sidebar.icon').removeClass('close').animate({opacity: '1'});
            $mobileItems.css({'display': 'flex'}).hide('fast');
            $mobileMenuTitle.show('fast');

            $('#menu').transition('fade out');
            $fixedItem.transition({animation: 'fade in', displayType: 'flex'});
            $fixedMenu.css('box-shadow', '0 1px 2px 0 rgba(34,36,38,.15)');
            $fixedMenu.css('background-color', '#fff');
        },
        onTopPassedReverse: function () {
            $('#menu').transition('fade in');
            $fixedItem.transition({animation: 'fade out', displayType: 'flex'});
            $fixedMenu.css('box-shadow', 'none');
            $fixedMenu.css('background-color', 'transparent');
            $('#post-menu').css('background-color', '#fff');
        }
    });
});

$mobileMenu.on('click', function () {
    if ($mobileMenu.hasClass('close')) {
        $('.close.icon').addClass('sidebar').css({'opacity': '0'});
        $('.sidebar.icon').removeClass('close').animate({opacity: '1'});
        $mobileItems.css({'display': 'flex'}).hide('fast');
        $mobileMenuTitle.show('fast');
    } else {
        $('.sidebar.icon').addClass('close').css({'opacity': '0'});
        $('.close.icon').removeClass('sidebar').animate({opacity: '1'});
        $mobileItems.css({'display': 'flex'}).show('fast');
        $mobileMenuTitle.hide('fast');
    }
});
