$(function() {
    var sidebartimeout = 0;
    $("#contact-wrap").hover(function() {
        $("#contact-wrap").animate({ left: '-10px' }, 500);
        clearTimeout(sidebartimeout);
    }, function() {
        clearTimeout(sidebartimeout);
        sidebartimeout = setTimeout(function() {
            $("#contact-wrap").animate({ left: "-184px" }, 500);
        }, 500);
    });
});

$(function() {
    var sidebartimeout = 0;
    $("#contact-wrap-right").hover(function() {
        $("#contact-wrap-right").animate({ right: '-9px' }, 500);
        clearTimeout(sidebartimeout);
    }, function() {
        clearTimeout(sidebartimeout);
        sidebartimeout = setTimeout(function() {
            $("#contact-wrap-right").animate({ right: "-184px" }, 500);
        }, 500);
    });
});