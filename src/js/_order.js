$(document).ready(function(){
    $(".labelBox").find(".customCb").each(function(){
        if ($(this).prop("checked") == true) {
            $(this).parents(".labelBox").addClass("__active");
            if ($(this)[0].hasAttribute("data-check-grub")) {
                let this_grub = $(this).attr("data-check-grub");
                $(this).parents("[data-check-main]").find("[data-check-content]").each(function(){
                    if ($(this).attr("data-check-content") == this_grub) {
                        $(this).addClass("__active");
                    }
                    else {
                        $(this).removeClass("__active");
                    }
                })
            }
        }
    })
    $("body").on("change", ".labelBox .customCb", function(){
        let this_name = $(this).attr("name");
        $(".labelBox").find(".customCb").each(function(){
            if ($(this).attr("name") == this_name) {
                $(this).parents(".labelBox").removeClass("__active");
            }
        });
        if ($(this)[0].hasAttribute("data-check-grub")) {
            let this_grub = $(this).attr("data-check-grub");
            $(this).parents("[data-check-main]").find("[data-check-content]").each(function(){
                if ($(this).attr("data-check-content") == this_grub) {
                    $(this).addClass("__active");
                }
                else {
                    $(this).removeClass("__active");
                }
            })
        }
        $(this).parents(".labelBox").addClass("__active");
    });
    $("body").on("click", "[data-label-dd-rel]", function(){
        if ($(this).find("[data-label-dd-input]").prop("checked") == true) {
            $(this).find("[data-label-dd]").addClass("__active");
        }
        // if (!$(this).hasClass("__open")) {
        //     $(this).parents("[data-label-dd-rel]").find("[data-label-dd]").addClass("__active");
        //     $(this).addClass("__open");
        // }
        // else {
        //     $(this).parents("[data-label-dd-rel]").find("[data-label-dd]").removeClass("__active");
        //     $(this).removeClass("__open");
        // }
    });
    $("body").on("click", function(e){
        if (!e.target.closest("[data-label-dd-rel]")) {
            $("[data-label-dd]").removeClass("__active");
        }
    });
    $("body").on("change", "[data-order-point] .customCb", function(e){
        if ($(this).prop("checked") == true) {
            let this_text = $(this).parents("[data-order-point]").find(".labelBox__text").html();
            let this_price = $(this).parents("[data-order-point]").find(".labelBox__price").html();
            $(this).parents("[data-label-dd-rel]").find("[data-label-dd-el]").find(".labelBox__text").html(this_text);
            $(this).parents("[data-label-dd-rel]").find("[data-label-dd-el]").find(".labelBox__price").html(this_price);
        }
    });
    
});