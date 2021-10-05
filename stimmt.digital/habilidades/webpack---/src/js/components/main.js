if (jQuery(window).width() < 1200) {
    jQuery('.company-col-text-2').after(jQuery('.company-col-text-3'));
}

jQuery(window).on('resize', function() {
    if (jQuery(window).width() < 1200) {
        jQuery('.company-col-text-2').after(jQuery('.company-col-text-3'));
    } else {
        jQuery('.circle-text').after(jQuery('.company-col-text-3'));
    }
});

if (jQuery('.scroll-to').length > 0) {
    jQuery('.scroll-to[href^="#"').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                jQuery('html,body').animate({
                    scrollTop: target.offset().top
                }, 1250, 'swing');
                return false;
            }
        }
    });
}