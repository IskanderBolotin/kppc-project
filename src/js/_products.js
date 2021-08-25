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
            e.target.closest(".counterBox").addClass("__focus");
        }
    });
});