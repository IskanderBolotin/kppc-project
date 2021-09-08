$(document).ready(function(){
    let supportsTouch = ('ontouchstart' in document.documentElement);
    if (!supportsTouch) {
        $("body").on("mouseenter", "[data-next-point]", function() {
            $(this).parents("[data-next-rel]").addClass("__active");
        });
        $("body").on("mouseleave", "[data-next-rel]", function() {
            $(this).removeClass("__active");
        });
    }
    else {
        $("body").on("click touchend", "[data-next-point]", function(e) {
            if (e.target.closest("[data-next-btn]")) {
                e.preventDefault()
                if ($(this).parents("[data-next-rel]").hasClass("__active")) {
                    $(this).parents("[data-next-rel]").removeClass("__active");
                }
                else {
                    $(this).parents("[data-next-rel]").addClass("__active");
                }
            }
        });
    }
    $("body").on("click", "[data-dd-btn]", function(){
        if ($(this).hasClass("__active")) {
            $(this).removeClass("__active");
            $(this).parents("[data-dd-rel]").removeClass("__active");
        }
        else {
            $(this).addClass("__active");
            $(this).parents("[data-dd-rel]").addClass("__active");
        }
    });

        
    
    let sliderInputs = document.querySelectorAll(".sliderInpEl");

    Array.prototype.forEach.call(sliderInputs, function(el) {
        noUiSlider.create(el, {
            connect: true,
            start: [1000, 8000],
            range: {
                'min': [0],
                'max': [10000]
            }
        });
        let min_inp = el.closest("[data-slider-el]").querySelector(".sliderInput__num-min");
        let max_inp = el.closest("[data-slider-el]").querySelector(".sliderInput__num-max");

        el.noUiSlider.on('update', function (values, handle) {
            var value = values[handle];
            if (handle) {
                max_inp.value = Math.round(value);
            } 
            else {
                min_inp.value = Math.round(value);
            }
        });
        min_inp.addEventListener('change', function () {
            el.noUiSlider.set([this.value, null]);
        });
        
        max_inp.addEventListener('change', function () {
            el.noUiSlider.set([null, this.value]);
        });
        $("body").on("click", "[data-clear-inp]", function(){
            let inp = $(this).parents("[data-focus-rel]").find("[data-focus-inp]");
            let inp_max = +inp.attr("max");
            let inp_min = +inp.attr("min");
            if (inp.hasClass("sliderInput__num-min")) {
                inp.val(inp_min);
                el.noUiSlider.set([inp_min, null]);
            }
            else {
                inp.val(inp_max);
                el.noUiSlider.set([null, inp_max]);
            }
            $(this).parents("[data-focus-rel]").removeClass("__active");
        });
    });

    let catalog_input_q = 0;

    $(window).on("scroll", function(){
        $("#filter-fxied-btn").remove();
    });
    $(window).on("resize", function(){
        $("#filter-fxied-btn").remove();
    });
    $("body").on("click", function(e){
        if (!e.target.closest("#filter-fxied-btn")) {
            $("#filter-fxied-btn").remove();
        }
    });
    
    $("body").on("change", "[data-filter-point]", function(){
        catalog_input_q = 0;
        let btn_pos_top = $(this).parents(".filterInputList__item").offset().top;
        let btn_pos_left = $(this).parents(".filterInputList__item").offset().left + $(this).parents(".filterInputList__item").outerWidth();
        $("#filter-fxied-btn").remove();
        if ($(this).prop("checked")) {
            $(this).parents("#catalog-filter").find("[data-filter-point]").each(function(){
                if ($(this).prop("checked")) {
                    catalog_input_q += 1;
                }
            });
            let _btn = $('<div id="filter-fxied-btn" class="filterFly"><a href="#" class="customBtn customBtn-dark"><span class="customBtn__inner">Применить <span class="quantBox">' + catalog_input_q + '</span></span></a></div>')
            _btn.css({"top": btn_pos_top + "px", "left": btn_pos_left + "px"});
            _btn.appendTo("body");
        }
        $("[data-f-quant]").find("[data-f-el]").text(catalog_input_q)
        if (catalog_input_q == 0) {
            $("[data-f-quant]").removeClass("__active");
        }
        else {
            $("[data-f-quant]").addClass("__active");
        }
    });
    $("body").on("change", "[data-to-label-box]", function(){
        let this_id = $(this).attr("id");
        let this_html = $(this).parents(".filterPoint").find(".filterPoint__text").html()
        
        if ($(this).prop("checked") == true) {
            $("[data-label-box]").addClass("__active");
            let labelbox = '<div class="choiceFilters__item choiceFilters__label" data-label-choice><label class="choiceLabel" data-label-remove for="'+ this_id +'"><span class="choiceLabel__inner">' + this_html+ '<span class="choiceLabel__ico"> <svg><use xlink:href="./icons/stack/icons.svg#close"></use></svg></span></span></label></div>';
            $("[data-label-box]").find(".choiceFilters__inner").append(labelbox);
        }
        else {
            $("[data-label-box]").each(function(){
                $(this).find("[data-label-choice]").each(function(){
                    let this_label = $(this).find("[data-label-remove]");
                    if (this_label.attr("for") == this_id) {
                        this_label.parents("[data-label-choice]").remove();
                    }
                });
                if ($(this).find("[data-label-choice]").length == 0) {
                    $(this).removeClass("__active");
                }
            });
        }
    });
    $("body").on("click", "[data-choice-del]", function(){
        $("[data-label-remove]").trigger("click");
    });
    $("body").on("click", "[data-label-remove]", function(e){
        e.preventDefault();
        let this_for = $(this).attr("for");
        $("#" + this_for).prop("checked", false);
        $("#" + this_for).trigger("change");
    });

    // открытие фильтра
    $("body").on("click", "[data-open-filer]", function(){
        $("#catalog-filter").addClass("__active");
        $("[data-overlay^='site']").addClass("__active");
        $("body").addClass("overflow-hidden");
    });

    // открытие сортировки адаптив
    $("body").on("click", "[data-sort-open]", function(){
        if ($(this).parents("[data-sort-el]").hasClass("__active")) {
            $(this).parents("[data-sort-el]").removeClass("__active")
        }
        else {
            $(this).parents("[data-sort-el]").addClass("__active")
        }
    });
    $("body").on("click", function(e){
        if (!e.target.closest("[data-sort-el]")) {
            $("[data-sort-el]").removeClass("__active");
        }
    });
    
    $("body").on("click", "[data-sort-point]", function(){
        let this_html = $(this).html();
        $(this).parents("[data-sort-el]").find("[data-sort-text]").html(this_html);
    });
});