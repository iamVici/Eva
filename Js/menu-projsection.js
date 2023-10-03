$(document).ready(function() {
    $(window).scroll(function() {
        var scrollPos = $(document).scrollTop();
        $('#nav-projsection a').each(function() {
        var currLink = $(this);
        var refElement = $(currLink.attr('href'));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('#nav-projsection ul li a').removeClass('active');
            currLink.addClass('active');
        } else {
            currLink.removeClass('active');
        }
        });
    });
});
  