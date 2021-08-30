$(document).ready(function() {
    let supportsTouch = ('ontouchstart' in document.documentElement);
    function openCatalogMenu() {
        let this_id = +$(this).attr("data-catalog-point");
        let this_deep = +$(this).closest("[data-catalog-deep]").attr("data-catalog-deep");
        $(this).parents("[data-catalog-main]").find("[data-catalog-deep]").each(function(){
            if ((+$(this).attr("data-catalog-deep") -1 == this_deep) && (+$(this).attr("data-catalog-id") == this_id)) {
                $(this).addClass("__active");
            }
            else if ((+$(this).attr("data-catalog-deep") -1 == this_deep) && (+$(this).attr("data-catalog-id") != this_id)) {
                $(this).removeClass("__active");
                $(this).find("[data-catalog-point]").removeClass("__active");
            }
            else if (+$(this).attr("data-catalog-deep") == this_deep) {
                $(this).find("[data-catalog-point]").removeClass("__active");
            }
            else if (+$(this).attr("data-catalog-deep") - 1 > this_deep) {
                $(this).removeClass("__active");
                $(this).find("[data-catalog-point]").removeClass("__active");
            }
        });
        $(this).addClass("__active");
    }


    $("body").on("input", "[data-search-input]", function() {
        if ($(this).val() != "") {
            $(this).parents("[data-search-main]").addClass("__active");
        }
        else {
            $(this).parents("[data-search-main]").removeClass("__active");
        }
    });

    $("body").on("click", "[data-search-cls]", function() {
        $(this).parents("[data-search-main]").find("[data-search-input]").val("");
        $(this).parents("[data-search-main]").removeClass("__active");
    });
    if (!supportsTouch) {
        $("body").on("mouseenter", "[data-toggle-btn]", function() {
            $(this).parents("[data-toggle-rel]").addClass("__active")
        });
        $("body").on("mouseleave", "[data-toggle-rel]", function() {
            $(this).removeClass("__active")
        });
        if ($(window).outerWidth() > 1150) {
            $("body").on("mouseenter", "[data-catalog-point]", openCatalogMenu);
            $("body").on("mouseleave", "[data-catalog-deep]", function(e) {
                if (!e.relatedTarget.closest("[data-catalog-deep]")) {
                    $(this).parents("[data-catalog-main]").find("[data-catalog-deep]").removeClass("__active");
                    $(this).parents("[data-catalog-main]").find("[data-catalog-point]").removeClass("__active");
                }
            });
        }
    }
    if ($(window).outerWidth() <= 1150) {
        $("body").on("click, touchend", "[data-catalog-point]", function(e) {
            if (+$(this).closest("[data-catalog-deep]").attr("data-catalog-deep") != 3) {
                e.preventDefault();
            }
        });
        $("body").on("click, touchend", "[data-catalog-point]", openCatalogMenu);
    }
    $("body").on("click", "[data-catalog-back]", function() {
        let this_id = $(this).closest("[data-catalog-deep]").attr("data-catalog-id");
        $(this).closest("[data-catalog-deep]").removeClass("__active");
        $(this).closest("[data-catalog-main]").find("[data-catalog-point=" + this_id +"]").removeClass("__active");
    });
    $("body").on("click", "[data-toggle-btn]", function() {
        if ($(this).parents("[data-toggle-rel]").hasClass("__active")) {
            $(this).parents("[data-toggle-rel]").removeClass("__active");
            if (supportsTouch) {
                $("[data-catalog-overlay]").removeClass("__active");
            }
        }
        else {
            $(this).parents("[data-toggle-rel]").addClass("__active");
            if (supportsTouch) {
                $("[data-catalog-overlay]").addClass("__active");
            }
        }
    });

    $("body").on("click", "[data-catalog-btn]", function() {
        if ($(this).parents("[data-catalog-rel]").hasClass("__active")) {
            $(this).parents("[data-catalog-rel]").removeClass("__active");
            $(this).removeClass("__active");
            $("[data-catalog-overlay]").removeClass("__active");
        }
        else {
            $(this).parents("[data-catalog-rel]").addClass("__active");
            $(this).addClass("__active");
            $("[data-catalog-overlay]").addClass("__active");
        }
    });
    $("body").on("click", "[data-rel-cls]", function(e) {
        $(this).parents("[data-toggle-rel]").removeClass("__active");
        $("[data-catalog-overlay]").removeClass("__active");
    });
    $("body").on("click", "[data-catalog-cls]", function(e) {
        $("[data-catalog-overlay]").removeClass("__active");
        $("[data-catalog-rel]").removeClass("__active");
        $("[data-catalog-btn]").removeClass("__active");
        $("[data-catalog-rel]").find("[data-catalog-deep]").removeClass("__active");
        $("[data-catalog-rel]").find("[data-catalog-point]").removeClass("__active");
    });
    $("body").on("mousedown", "[data-catalog-overlay]", function(e) {
        $("[data-toggle-rel]").removeClass("__active");
        $(this).removeClass("__active");
        $("[data-catalog-rel]").removeClass("__active");
        $("[data-catalog-btn]").removeClass("__active");
        $("[data-catalog-rel]").find("[data-catalog-deep]").removeClass("__active");
        $("[data-catalog-rel]").find("[data-catalog-point]").removeClass("__active");
    });
    let is_move = false;
    function movEl() {
        if (($(window).outerWidth() < 876) && (!is_move)) {
            $("[data-header-mobile-top]").prepend($("[data-move-logo]"));
            $("[data-header-mobile-bot]").prepend($("[data-move-search]"));
            is_move = true;
        }
        else if (($(window).outerWidth() >= 876) && (is_move)) {
            $("[data-header-desktop-bot]").prepend($("[data-move-search]"));
            $("[data-header-desktop-bot]").prepend($("[data-move-logo]"));
            is_move = false;
        }
    }
    movEl();
    $(window).on("resize", function(){
        movEl();
    });
    $("body").on("click", "[data-open-menu]", function(){
        if ($(this).hasClass("__active")) {
            $("#menu-mobile").removeClass("__active");
            $(this).removeClass("__active");
        }
        else {
            $("#menu-mobile").addClass("__active");
            $(this).addClass("__active");
        }
    });
    $("body").on("click", "[data-menu-close]", function(){
        $("#menu-mobile").removeClass("__active");
        $("[data-open-menu]").removeClass("__active");
    });
    

    // sticky header 
    let start_offset_top = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    let start_pos = document.getElementById("sticky-header").getBoundingClientRect().top + start_offset_top;
    let start_pos__main = document.getElementById("main-header").getBoundingClientRect().top + start_offset_top;
    if (window.innerWidth < 876) {
        window.addEventListener('scroll', function() {
            if (window.innerWidth < 876) {
                let offset_top = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
                let sticky_header = document.getElementById("sticky-header");
                let header_height = sticky_header.offsetHeight;
                
                if (start_pos <= offset_top) {
                    document.querySelector('.siteContent').style.paddingTop = header_height + "px";
                    sticky_header.classList.add('__sticky');
                }
                else {
                    document.querySelector('.siteContent').style.paddingTop = "0";
                    sticky_header.classList.remove('__sticky');
                }
            }
        });
    }
    else {
        window.addEventListener('scroll', function() {
            if (window.innerWidth >= 876) {
                let offset_top = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
                let sticky_header = document.getElementById("main-header");
                let header_height = sticky_header.offsetHeight;
                
                if (offset_top > 0) {
                    document.querySelector('.siteContent').style.paddingTop = header_height + "px";
                    sticky_header.classList.add('__sticky');
                }
                else {
                    document.querySelector('.siteContent').style.paddingTop = "0";
                    sticky_header.classList.remove('__sticky');
                }
            }
        });
    }
    let startScroll_main = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    window.addEventListener('scroll', function() {
        let curScroll = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
        let direction;
        if (curScroll < startScroll_main) {
            direction = "Up";
            document.body.classList.add("__window-up");
        }
        else {
            direction = "down";
            document.body.classList.remove("__window-up");
        }
        startScroll_main = curScroll;
    });
}); 