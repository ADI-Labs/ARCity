$(document).ready(() => {
    const open = $('.open-nav');
    const close = $('.close');
    const overlay = $('.overlay');
    const stores = $('#Stores');
    const restaurants = $('#Restaurants');

    function closeMenu() {
        overlay.hide();
        $('#wrapper').removeClass('toggled');
    }

    open.click(() => {
        overlay.show();
        $('#wrapper').addClass('toggled');
    });

    close.click(closeMenu);
    stores.click(closeMenu);
    restaurants.click(closeMenu);
});
