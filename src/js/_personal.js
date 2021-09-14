$(document).ready(function(){
    $("body").on("click", "[data-edit-btn]", function(){
        $(this).parents("[data-content-area]").addClass("__edit");
    });
    $("body").on("click", "[data-edit-back]", function(){
        $(this).parents("[data-content-area]").removeClass("__edit");
        $(this).parents("[data-content-area]").removeClass("__password");
    });
    $("body").on("click", "[data-edit-pass-btn]", function(){
        $(this).parents("[data-content-area]").addClass("__password");
    });
    $("body").on("click", "[data-pass-switcher]", function(){
        if (!$(this).hasClass("__active")) {
            $(this).addClass("__active");
            $(this).parents("[data-switcher-block]").find("[type='password']").attr("type", "text");
        }
        else {
            $(this).removeClass("__active");
            $(this).parents("[data-switcher-block]").find("[type='text']").attr("type", "password");
        }
    });
    
});