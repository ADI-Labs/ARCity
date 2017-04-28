$(document).ready(() => {
    const open = $('.open-nav');
    const close = $('.close');
    const overlay = $('.overlay');
    const categorySearch = $('.category-search');

    function closeMenu() {
        overlay.hide();
        $('#wrapper').removeClass('toggled');
    }

    open.click(() => {
        overlay.show();
        $('#wrapper').addClass('toggled');
    });

    close.click(closeMenu);
    categorySearch.click(closeMenu);
});
