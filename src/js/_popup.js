$(document).ready(function(){
    $("body").on("click", "[data-modal]", function(e){
        if (!e.target.closest("[data-modal-el]")) {
            $(this).removeClass("__active");
            $(this).find("[data-modal-el]").removeClass("__active");
        }
    });
    $("body").on("click", "[data-modal-close]", function(e){
        $(this).parents("[data-modal]").removeClass("__active");
        $(this).parents("[data-modal-el]").removeClass("__active");
    });
    
});