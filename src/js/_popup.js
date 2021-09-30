$(document).ready(function(){
    $("body").on("click", "[data-modal]", function(e){
        if (!e.target.closest("[data-modal-el]")) {
            $(this).removeClass("__active");
            $(this).find("[data-modal-el]").removeClass("__active");
            $("body").removeClass("overflow-hidden");
            $("body").css("padding-right", "0");
            $(".mainHeader.__sticky").css("padding-right", "0");
        }
    });
    $("body").on("click", "[data-modal-close]", function(e){
        $(this).parents("[data-modal]").removeClass("__active");
        $(this).parents("[data-modal-el]").removeClass("__active");
        $("body").removeClass("overflow-hidden");
        $("body").css("padding-right", "0");
        $(".mainHeader.__sticky").css("padding-right", "0");
    });
    $("body").on("click", "[data-modal-open]", function(e){
        $("[data-modal]").removeClass("__active");
        $("[data-modal-el]").removeClass("__active");
        $("body").removeClass("overflow-hidden");
        $("body").css("padding-right", "0");
        $(".mainHeader.__sticky").css("padding-right", "0");
        let this_id = $(this).attr("data-modal-open");
        $("[data-modal]").each(function(){
            if ($(this).attr("data-modal") == this_id) {
                $(this).addClass("__active");
                $(this).find("[data-modal-el]").addClass("__active");
                let pad_right = window.innerWidth - document.documentElement.clientWidth;
                $("body").addClass("overflow-hidden");
                $("body").css("padding-right", pad_right + "px");
                $(".mainHeader.__sticky").css("padding-right", pad_right + "px");
            }
        });
    });
});