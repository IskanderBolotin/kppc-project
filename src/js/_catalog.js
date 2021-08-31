$(document).ready(function(){
    let supportsTouch = ('ontouchstart' in document.documentElement);
    if (!supportsTouch) {
        $("body").on("mouseenter", "[data-next-point]", function() {
            $(this).parents("[data-next-rel]").addClass("__active");
        });
        $("body").on("mouseleave", "[data-next-rel]", function() {
            $(this).removeClass("__active");
        });
    }
    else {
        $("body").on("click touchend", "[data-next-point]", function(e) {
            if (e.target.closest("[data-next-btn]")) {
                e.preventDefault()
                if ($(this).parents("[data-next-rel]").hasClass("__active")) {
                    $(this).parents("[data-next-rel]").removeClass("__active");
                }
                else {
                    $(this).parents("[data-next-rel]").addClass("__active");
                }
            }
        });
    }
});