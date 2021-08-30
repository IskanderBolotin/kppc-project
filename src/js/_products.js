$(document).ready(function(){
    $("body").on("click", ".counterBox__btn", function() {
        $(this).parents(".counterBox").addClass("__focus");
        let min_val = $(this).parents(".counterBox").find(".counterBox__input-field").attr("data-min");
        let max_val = $(this).parents(".counterBox").find(".counterBox__input-field").attr("data-max");
        let step = +$(this).parents(".counterBox").find(".counterBox__input-field").attr("data-step");
        let cur_val = +$(this).parents(".counterBox").find(".counterBox__input-field").val();
        let inp = $(this).parents(".counterBox").find(".counterBox__input-field");
        if ($(this).hasClass("counterBox__btn-minus")) {
            if (min_val) {
                if (!(cur_val - step < +min_val)) {
                    inp.val(cur_val - step);
                }
            }
            else if (!(cur_val - step < 0)) {
                inp.val(cur_val - step);
            }
        }
        else if ($(this).hasClass("counterBox__btn-plus")) {
            if (max_val) {
                if (!(cur_val + step > +max_val)) {
                    inp.val(cur_val + step);
                }
            }
            else {
                inp.val(cur_val + step);
            }
        }
    });
    $("body").on("change", ".counterBox__input-field", function () {
        let min_val = +$(this).attr("data-min");
        let max_val = +$(this).attr("data-max");
        let cur_val = +$(this).val();
        if ((min_val && max_val) || (min_val == 0 && max_val)) {
            if (cur_val < min_val) {
                $(this).val(min_val)
            }
            else if (cur_val > max_val) {
                $(this).val(max_val);
            }
            else if (cur_val == min_val) {
                $(this).val(min_val);
            }
        }
        else if (min_val) {
            if (cur_val < min_val) {
                $(this).val(min_val)
            }
        }
        else if (max_val) {
            if (cur_val > max_val) {
                $(this).val(max_val);
            }
        }
    });
    $("body").on("focus", ".counterBox__input-field", function () {
        $(this).parents(".counterBox").addClass("__focus");
    });
    $("body").on("blur", ".counterBox__input-field", function () {
        $(this).parents(".counterBox").removeClass("__focus");
    });
    $("body").on("click", function (e) {
        if (!e.target.closest(".counterBox")) {
            $(".counterBox").removeClass("__focus");
        }
        else {
            $(e.target.closest(".counterBox")).addClass("__focus");
        }
    });
    let product__hover = true;

    let arrow_ico = '<svg viewBox="0 0 24 11.4"><path d="M18.3,11.4,16.9,10l3.3-3.3H0v-2H20.2L16.9,1.4,18.3,0,24,5.7Z"/></svg>';
    let arrow_prev = '<button class="sliderArrow sliderArrow-prev"><span class="sliderArrow__inner">' + arrow_ico + '</span></button>';
    let arrow_next = '<button class="sliderArrow sliderArrow-next"><span class="sliderArrow__inner">' + arrow_ico + '</span></button>';
    
    
    if ($(window).outerWidth() >= 1230) {
        $("body").on("mouseenter", "[data-product-hover]", function() {
            if (product__hover) {
                let _this = $(this);
                let this_id = $(this).attr("data-product-id");
                $(this).addClass("__hover");
                let el = $(this).find("[data-product-fixed]");
                let pos_top = $(this).offset().top + $(this).outerHeight();
                let pos_left = $(this).offset().left;
                let el_width = $(this).outerWidth();
                el.attr("data-id-chain", this_id)
                el.css({
                    'top' : pos_top + "px", 
                    'width': el_width + "px", 
                    'left': pos_left + "px"
                });
                el.addClass("__active");
                el.appendTo("body");
                product__hover = false;
            }
        });
        $("body").on("mouseleave", "[data-product-hover]", function(e) {
            let this_id = $(this).attr("data-product-id");
            let _this = $(this);
            if (!e.relatedTarget.closest("[data-product-fixed]")) {
                $(this).removeClass("__hover");
                $("[data-product-fixed]").each(function(){
                    if ($(this).attr("data-id-chain") == this_id) {
                        $(this).removeClass("__active");
                        $(this).appendTo(_this);
                    }
                });
                product__hover = true;
            }
        });
        $("body").on("mouseleave", "[data-product-fixed]", function(e) {
            let this_id = $(this).attr("data-id-chain");
            let _this = $(this);
            let cond = e.relatedTarget.closest("[data-product-hover]") && (this_id != $(e.relatedTarget.closest("[data-product-hover]")).attr("data-product-id"));
            if (!e.relatedTarget.closest("[data-product-hover]") || cond) {
                $(this).removeClass("__active");
                $("[data-product-hover]").each(function(){
                    if ($(this).attr("data-product-id") == this_id) {
                        $(this).removeClass("__hover");
                        $(_this).appendTo(this);
                    }
                });
                product__hover = true;
            }
        });
    }
    $("body").on("click", "[data-add-basket]", function() {
        $(this).parents("[data-product-fixed]").addClass("__in-cart");
    });
    $(".product-slider").each(function(){
        let _this = $(this);
        let min_slider = $(this).hasClass("product-slider--min");
        $(this).slick({
            dots: false,
            infinite: false,
            arrows: true,
            slidesToShow: min_slider ? 3 : 5,
            slidesToScroll: 1,
            swipe: false,
            swipeToSlide: false,
            prevArrow: arrow_prev,
            nextArrow: arrow_next,
            appendArrows: _this.parents("[data-slider-ctrl]").find("[data-slider-desktop-arrow]"),
            responsive: [
                {
                    breakpoint: 1501,
                    settings: {
                        slidesToShow: min_slider ? 2 : 4,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 1231,
                    settings: {
                        slidesToShow: min_slider ? 2 : 4,
                        slidesToScroll: 1,
                        swipe: true,
                        swipeToSlide: true,
                    }
                },
                {
                    breakpoint: 961,
                    settings: {
                        slidesToShow: min_slider ? 3 : 3,
                        slidesToScroll: 1,
                        swipe: true,
                        swipeToSlide: true
                    }
                },
                {
                    breakpoint: 875,
                    settings: {
                        slidesToShow: min_slider ? 3 : 3,
                        slidesToScroll: 1,
                        appendArrows: _this.parents("[data-slider-ctrl]").find("[data-slider-mobile-arrow]"),
                        swipe: true,
                        swipeToSlide: true
                    }
                },
                {
                    breakpoint: 577,
                    settings: {
                        slidesToShow: min_slider ? 2 : 2,
                        slidesToScroll: 1,
                        appendArrows: _this.parents("[data-slider-ctrl]").find("[data-slider-mobile-arrow]"),
                        swipe: true,
                        swipeToSlide: true
                    }
                },
            ]
        });
        $(this).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            product__hover = false;
        });
        $(this).on('afterChange', function (event, slick, currentSlide, nextSlide) {
            product__hover = true;
        });
    });
    let labels_adapt = false;
    if ($(window).outerWidth() <= 576 && !labels_adapt) {
        $(".productEl").each(function() {
            let labels = $(this).find(".productLabels__inner");
            $(this).find(".productCateg").appendTo(labels);
            $(this).find(".productLabels__inner").children().each(function() {
                if (!$(this).hasClass("productLabels__item-btn") && !$(this).hasClass("productLabels__item-new")) {
                    $(this).hide();
                }
            });
            labels_adapt = true
        });
    }
    $(window).on("resize", function(){
        if ($(window).outerWidth() <= 576 && !labels_adapt) {
            $(".productEl").each(function() {
                let labels = $(this).find(".productLabels__inner");
                $(this).find(".productCateg").appendTo(labels);
                $(this).find(".productLabels__inner").children().each(function() {
                    if (!$(this).hasClass("productLabels__item-btn") && !$(this).hasClass("productLabels__item-new")) {
                        $(this).hide();
                    }
                });
            });
            labels_adapt = true
        }
    });
    $("body").on("click", "[data-open-label]", function() {
        if (!$(this).hasClass("__active")) {
            $(this).parents(".productLabels__inner").children().each(function() {
                if (!$(this).hasClass("productLabels__item-btn") && !$(this).hasClass("productLabels__item-new")) {
                    $(this).show();
                }
            });
            $(this).addClass("__active");
        }
        else {
            $(this).parents(".productLabels__inner").children().each(function() {
                if (!$(this).hasClass("productLabels__item-btn") && !$(this).hasClass("productLabels__item-new")) {
                    $(this).hide();
                }
            });
            $(this).removeClass("__active");
        }
    });
});