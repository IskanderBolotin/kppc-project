$(document).ready(function(){
    $("body").on("click", "[data-toggle-like]", function() {
        if ($(this).hasClass("__active")) {
            $(this).removeClass("__active");
        }
        else {
            $(this).parents("[data-toggle-mark]").find("[data-toggle-like]").removeClass("__active");
            $(this).addClass("__active");
        }
    })
})