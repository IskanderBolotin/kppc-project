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
        $(this).parents("[data-side-menu]").find("[data-side-fixed]").addClass("__active");
        $("[data-overlay-static]").addClass("__active");
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
});