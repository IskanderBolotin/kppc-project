$(document).ready(function(){
    let mobile_vers = false
    if ($(window).outerWidth() <= 790) {
        if (!mobile_vers) {
            $("[data-prod-desktop]").each(function(){
                let this_id = $(this).attr("data-prod-desktop");
                $(this).parents("[data-product-cart]").find("[data-prod-mobile=" + this_id + "]").append($(this).html());
                $(this).children().remove()
            });
            mobile_vers = true
        }
    }
    $(window).on("resize", function(){
        if ($(window).outerWidth() <= 790) {
            if (!mobile_vers) {
                $("[data-prod-desktop]").each(function(){
                    let this_id = $(this).attr("data-prod-desktop");
                    $(this).parents("[data-product-cart]").find("[data-prod-mobile=" + this_id + "]").append($(this).html());
                    $(this).children().remove()
                });
                mobile_vers = true
            }
        }
        else {
            if (mobile_vers) {
                $("[data-prod-mobile]").each(function(){
                    let this_id = $(this).attr("data-prod-mobile");
                    $(this).parents("[data-product-cart]").find("[data-prod-desktop=" + this_id + "]").append($(this).html());
                    $(this).children().remove()
                });
                mobile_vers = false
            }
        }
    })
});