$(document).ready(function(){
    $(".product-gallery").each(function(){
        $(this).slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			swipeToSlide: true,
            arrows: false,
            asNavFor: '.sideGallery-slider',
            responsive: [
                {
                    breakpoint: 1301,
                    settings: {
                        dots: true
                    }
                },
            ]
		});
    });
    let arrowBtn_prev = '<button class="cmpExtraBtn cmpExtraBtn-prev"><span class="cmpExtraBtn__inner"><svg width="9px" height="6px"><use xlink:href="./icons/stack/icons.svg#dropdown"></use></svg></span></button>';
    let arrowBtn_next = '<button class="cmpExtraBtn cmpExtraBtn-next"><span class="cmpExtraBtn__inner"><svg width="9px" height="6px"><use xlink:href="./icons/stack/icons.svg#dropdown"></use></svg></span></button>'
    $(".sideGallery-slider").slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		arrows: true,
		vertical: true,
		verticalSwiping: true,
		focusOnSelect: true,
		swipeToSlide: true,
        prevArrow: arrowBtn_prev,
        nextArrow:  arrowBtn_next,
		asNavFor: '.product-gallery',
	});
    $('.sideGallery-slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
		if (slick.$slides.length <= slick.options.slidesToShow) {
			$(this).find(".slick-track").addClass("stopSlider");
		}
		else {
			$(this).find(".slick-track").removeClass("stopSlider");
		}
	});
    $("body").on("click", "[data-desc-btn]", function() {
        if (!$(this).hasClass("__active")) {
            $(this).addClass("__active");
            $(this).parents("[data-desc]").addClass("__active");
        }
        else {
            $(this).removeClass("__active");
            $(this).parents("[data-desc]").removeClass("__active");
        }
    })
    $("body").on("click", "[data-grub-btn]", function(){
        let this_id = $(this).attr("data-grub-btn");
        $(this).parents("[data-grub-box]").find("[data-grub-btn]").removeClass("__active");
        $(this).parents("[data-grub-box]").find("[data-grub]").removeClass("__active");
        $(this).addClass("__active");
        $(this).parents("[data-grub-box]").find("[data-grub]").each(function(){
            if ($(this).attr("data-grub") == this_id) {
                $(this).addClass("__active");
            }
        });
    });
});