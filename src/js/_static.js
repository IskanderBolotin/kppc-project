$(document).ready(function(){
    $("body").on("click", "[data-answer-open]", function() {
        if (!$(this).hasClass("__active")) {
            $(this).addClass("__active");
            $(this).parents("[data-answer]").addClass("__active");
        }
        else {
            $(this).removeClass("__active");
            $(this).parents("[data-answer]").removeClass("__active");
        }
    })
    $("body").on("click", "[data-side-open]", function(){
        if ($(window).outerWidth() < 1150) {
            $(this).parents("[data-side-menu]").find("[data-side-fixed]").addClass("__active");
            $("[data-overlay-static]").addClass("__active");
        }
    })
    $("body").on("click", "[data-side-cls]", function(){
        $(this).parents("[data-side-fixed]").removeClass("__active");
        $("[data-overlay-static]").removeClass("__active");
    })
    $("body").on("mousedown touchend", "[data-overlay-static]", function(){
		$(this).removeClass("__active");
		$("[data-side-fixed]").removeClass("__active");
	});
	$("body").on("keydown", function(e) {
		if ($("[data-overlay-static]").hasClass("__active")) {
			if (e.code == "Escape") {
				$("[data-side-fixed]").removeClass("__active");
				$("[data-overlay-static]").removeClass("__active");
			}
		}
	});
    $(".gallerySlides").lightGallery({
		selector: ".gallery-item",
	})
    let adaptStatic = false;
    if ($(window).outerWidth() < 1151) {
        if (!adaptStatic) {
            $(".staticExtra").appendTo(".staticExtra-mb");
            adaptStatic = true
        }
    }
    $(window).on("resize", function(){
        if ($(window).outerWidth() < 1151) {
            if (!adaptStatic) {
                $(".staticExtra").appendTo(".staticExtra-mb");
                adaptStatic = true
            }
        }
        else {
            if (adaptStatic) {
                $(".staticExtra").appendTo(".staticExtra-dt");
                adaptStatic = false
            }
        }
    });
    $("body").on("click", ".staticLink[href^='#']", function(e){
        e.preventDefault();
        let _this = $(this)
        let offset_top = $("#main-header").outerHeight();
        $(this).parents("[data-side-fixed]").find(".staticLink").removeClass("__active");
        $(this).addClass("__active");
        $(this).parents("[data-side-fixed]").removeClass("__active");
        $("[data-overlay-static]").removeClass("__active");
        $(this).parents("[data-side-fixed]").on("transitionend", scrollToTag)
        function scrollToTag() {
            $("html, body").animate({
                scrollTop: +$(_this.attr("href")).offset().top - +offset_top + "px"
            }, {
                duration: 500,
            });
            _this.parents("[data-side-fixed]").off("transitionend", scrollToTag)
        }
        
    })
});