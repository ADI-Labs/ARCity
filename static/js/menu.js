$(document).ready(() => {
    const open = $('.open-nav');
    const close = $('.close');
    const overlay = $('.overlay');

    open.click(() => {
        overlay.show();
        $('#wrapper').addClass('toggled');
    });

    close.click(() => {
        overlay.hide();
        $('#wrapper').removeClass('toggled');
    });
});
