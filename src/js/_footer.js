
$(document).ready(function() {
    
    $("body").on("click", "[data-list-open]", function(e) {
        if ($(window).outerWidth() <= 576) {
            e.preventDefault()
            if ($(this).hasClass("__active")) {
                $(this).removeClass("__active")
                $(this).closest("[data-list-rel]").removeClass("__active")
            }
            else {
                $(this).addClass("__active")
                $(this).closest("[data-list-rel]").addClass("__active")
            }
        }
    });
    $("body").on("click", "[data-to-top]", function(e) {
        $('body,html').animate({scrollTop: 0}, 400); 
    });
    
});