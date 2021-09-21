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
    });
    let arrow_ico = '<svg viewBox="0 0 24 11.4"><path d="M18.3,11.4,16.9,10l3.3-3.3H0v-2H20.2L16.9,1.4,18.3,0,24,5.7Z"/></svg>';
    let arrow_prev = '<button class="sliderArrow sliderArrow-prev"><span class="sliderArrow__inner">' + arrow_ico + '</span></button>';
    let arrow_next = '<button class="sliderArrow sliderArrow-next"><span class="sliderArrow__inner">' + arrow_ico + '</span></button>';
    $(".servSlider__list-slider").each(function(){
        let _this = $(this);
        $(this).slick({
            infinite: true,
            arrows: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            swipeToSlide: true,
            prevArrow: arrow_prev,
            nextArrow: arrow_next,
            appendArrows: _this.parents("[data-slider-ctrl]").find("[data-slider-desktop-arrow]"),
            responsive: [
                {
                    breakpoint: 875,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        appendArrows: _this.parents("[data-slider-ctrl]").find("[data-slider-mobile-arrow]"),
                        swipe: true,
                        swipeToSlide: true
                    }
                },
                {
                    breakpoint: 577,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        appendArrows: _this.parents("[data-slider-ctrl]").find("[data-slider-mobile-arrow]"),
                        swipe: true,
                        swipeToSlide: true
                    }
                },
            ]
        });
    });
});