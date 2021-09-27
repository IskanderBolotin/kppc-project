$(document).ready(function(){
    $("body").on("click", "[data-modal]", function(e){
        if (!e.target.closest("[data-modal-el]")) {
            $(this).removeClass("__active");
            $(this).find("[data-modal-el]").removeClass("__active");
            $("body").removeClass("overflow-hidden");
        }
    });
    $("body").on("click", "[data-modal-close]", function(e){
        $(this).parents("[data-modal]").removeClass("__active");
        $(this).parents("[data-modal-el]").removeClass("__active");
        $("body").removeClass("overflow-hidden");
    });
    $("body").on("click", "[data-modal-open]", function(e){
        $("[data-modal]").removeClass("__active");
        $("[data-modal-el]").removeClass("__active");
        $("body").removeClass("overflow-hidden");
        let this_id = $(this).attr("data-modal-open");
        $("[data-modal]").each(function(){
            if ($(this).attr("data-modal") == this_id) {
                $(this).addClass("__active");
                $(this).find("[data-modal-el]").addClass("__active");
                $("body").addClass("overflow-hidden");
            }
        });
    });
});