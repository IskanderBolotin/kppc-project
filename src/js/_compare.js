$(document).ready(function(){
    // сравнение
    let col_line = $(".propProductList").eq(0).find(".propProductList__item").length;
    let col_list = $(".propProductList").length;
    for (let i = 0 ; i < col_line; i++) {
        let max_h = 0;
        for (let j = 0 ; j < col_list; j++) {
            let cur_h = $(".propProductList").eq(j).find(".propProductList__item").eq(i).outerHeight();
            if (cur_h > max_h) {
                max_h = cur_h;
            }
        }
        $(".propProductList").each(function() {
            $(this).find(".propProductList__item").each(function (index, element) {
                if (index == i) {
                    $(this).css("min-height", max_h + "px");
                }
            });
        })
    };
    $("body").on("mouseenter", ".propProductList__item", function() {
        $(this).addClass("__hover");
        let this_num = $(this).parents(".propProductList").find(this).index();
        $(".propProductList").each(function() {
            $(this).find(".propProductList__item").each(function (index, element) {
                if (index == this_num) {
                    $(this).addClass("__hover");
                }
            });
        })
    });
    $("body").on("mouseleave", ".propProductList__item", function() {
        $(this).removeClass("__hover");
        let this_num = $(this).parents(".propProductList").find(this).index();
        $(".propProductList").each(function() {
            $(this).find(".propProductList__item").each(function (index, element) {
                if (index == this_num) {
                    $(this).removeClass("__hover");
                }
            });
        })
    });
    $(window).on("resize", function () {
        // сравнение
        let col_line = $(".propProductList").eq(0).find(".propProductList__item").length;
        let col_list = $(".propProductList").length;
        for (let i = 0 ; i < col_line; i++) {
            let max_h = 0;
            for (let j = 0 ; j < col_list; j++) {
                let cur_h = $(".propProductList").eq(j).find(".propProductList__item").eq(i).outerHeight();
                if (cur_h > max_h) {
                    max_h = cur_h;
                }
            }
            $(".propProductList").each(function() {
                $(this).find(".propProductList__item").each(function (index, element) {
                    if (index == i) {
                        $(this).css("min-height", max_h + "px");
                    }
                });
            })
        };
    });
    
});