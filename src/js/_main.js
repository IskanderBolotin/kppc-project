$(document).ready(function(){
	let arrow_ico = '<svg viewBox="0 0 24 11.4"><path d="M18.3,11.4,16.9,10l3.3-3.3H0v-2H20.2L16.9,1.4,18.3,0,24,5.7Z"/></svg>';
	let arrow_prev = '<button class="sliderArrow sliderArrow-prev"><span class="sliderArrow__inner">' + arrow_ico + '</span></button>';
	let arrow_next = '<button class="sliderArrow sliderArrow-next"><span class="sliderArrow__inner">' + arrow_ico + '</span></button>';
	$(".videoBox-slider").each(function(){
		let _this = $(this);
		$(this).slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: true,
			swipeToSlide: true,
			prevArrow: arrow_prev,
			nextArrow: arrow_next,
			responsive: [
				{
					breakpoint: 1231,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						appendArrows: _this.parents("[data-video-ctrl]").find("[data-video-arrow]"),
					}
				},
			]
		});
	});
	$(".brandList-slider").each(function(){
		let _this = $(this);
		$(this).slick({
			slidesToShow: 6,
			slidesToScroll: 1,
			dots: false,
			infinite: false,
			arrows: true,
			swipeToSlide: true,
			prevArrow: arrow_prev,
			nextArrow: arrow_next,
			appendArrows:  _this.parents("[data-slider-ctrl]").find("[data-slider-desktop-arrow]"),
			responsive: [
				{
					breakpoint: 1231,
					settings: {
						slidesToShow: 5,
						slidesToScroll: 1,
					}
				},
				{
					breakpoint: 875,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1,
						appendArrows: _this.parents("[data-slider-ctrl]").find("[data-slider-mobile-arrow]"),
					}
				},
			]
		});
	});
	$(".bannerList-slider").each(function(){
		let _this = $(this);
		$(this).slick({
			dots: false,
			infinite: false,
			arrows: true,
			slidesToShow: 2,
			slidesToScroll: 1,
			swipeToSlide: true,
			prevArrow: arrow_prev,
			nextArrow: arrow_next,
			appendArrows: _this.parents("[data-slider-ctrl]").find("[data-slider-desktop-arrow]"),
			responsive: [
				{
					breakpoint: 876,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						appendArrows: _this.parents("[data-slider-ctrl]").find("[data-slider-mobile-arrow]"),
					}
				},
			]
		});
	})
	$(".customScrollBox").mCustomScrollbar({});
	$("body").on("click", "[data-ct-btn]", function(){
		let start_offset_top = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
		let this_txt = $(this).find("[data-ct-txt]").text();
		let new_text = $(this).find("[data-ct-txt]").attr("data-ct-txt");
		$(this).find("[data-ct-txt]").text(new_text);
		$(this).find("[data-ct-txt]").attr("data-ct-txt", this_txt)
		if (!$(this).hasClass("__active")) {
			$(this).addClass("__active");
			$(this).parents("[data-ct-area]").find("[data-ct]").addClass("__active");
			// window.scrollTo(0, start_offset_top);
			document.documentElement.scrollTop = start_offset_top;
		}
		else {
			$(this).removeClass("__active");
			$(this).parents("[data-ct-area]").find("[data-ct]").removeClass("__active");
		}
	});
	$("body").on("click", "[data-toggle-status]", function(){
		$(this).toggleClass("__active");
	});
	$("body").on("focus", "[data-focus-inp]", function(){
		$(this).parents("[data-focus-rel]").addClass("__active");
	});
	tippy('[data-tooltip]', {
		trigger: 'click',
	});
	$("body").on("click", "[data-tooltip]", function(e){
		e.stopPropagation();
		$(".tippy-content").mCustomScrollbar({})
	});
	$("body").on("click", "[data-cls-element]", function(e){
		$(this).parents("[data-element]").removeClass("__active");
		$("[data-overlay]").removeClass("__active");
		$("body").removeClass("overflow-hidden");
		$("body").css("padding-right", "0");
		$(".mainHeader.__sticky").css("padding-right", "0");
	});
	$("body").on("mousedown touchend", "[data-overlay]", function(){
		$(this).removeClass("__active");
		$("[data-element]").removeClass("__active");
		$("body").removeClass("overflow-hidden");
		$("body").css("padding-right", "0");
		$(".mainHeader.__sticky").css("padding-right", "0");
	});
	$("body").on("keydown", function(e) {
		if ($("[data-overlay]").hasClass("__active")) {
			if (e.code == "Escape") {
				$("[data-overlay]").removeClass("__active");
				$("[data-element]").removeClass("__active");
				$("body").removeClass("overflow-hidden");
				$("body").css("padding-right", "0");
				$(".mainHeader.__sticky").css("padding-right", "0");
			}
		}
	});
	$("[data-rait]").each(function(){
		let width_el = +$(this).find("[data-rait-point]").outerWidth();
		let this_value = +$(this).attr("data-rait");
		let fill_star = +Math.floor(this_value);
		let part_star = this_value - fill_star;
		let rect_val = (width_el * part_star).toFixed();
		let rect = "rect(auto, " + rect_val + "px, auto, 0)";
		$(this).find("[data-rait-point]").each(function(index) {
			if (index <= fill_star) {
				$(this).addClass("__fill-star")
			}
			if (index == fill_star) {
				$(this).find("[data-rait-fill]").css("clip", rect);
			}
		})
	});

	
});
window.addEventListener("load", function() {
	// ???????????????????? ????????????
	$("[data-error]").each(function(index, el, array){
		let text = $(this).attr("data-error-text") ? $(this).attr("data-error-text") : "?????????????????? ???? ???????????? ?????????????????? ??????????";
		let pos_top = +$(this).offset().top - 3;
		let pos_left = +$(this).offset().left - 3;
		let el_width = +$(this).outerWidth() + 6;
		let error = document.createElement('div');
		error.className = "errorBox";
		error.setAttribute("data-error-id", index);
		error.innerHTML = "<div class='errorBox__text'>" + text +"</div>";
		error.style.width = el_width + "px";
		error.style.top = pos_top + "px";
		error.style.left = pos_left + "px";
		$(this).attr("data-error", index);
		$(this).addClass("__error");
		document.body.append(error);
	});
	// ???????????????? ????????????
	
	$("body").on("input", "[data-error]", function(){
		if ($(this).val() == "") {
			let this_id = $(this).attr("data-error");
			$(this).removeAttr("data-error");
			$(this).removeClass("__error")
			$("[data-error-id=" + this_id + "]").remove();
		}
	});
	$(window).on("resize", function() {
		$("[data-error]").each(function(){
			let this_id = $(this).attr("data-error");
			$(this).removeAttr("data-error");
			$(this).removeClass("__error")
			$("[data-error-id=" + this_id + "]").remove();
		})
	});
	var Russian = {
		weekdays: {
			shorthand: ["????", "????", "????", "????", "????", "????", "????"],
			longhand: [
				"??????????????????????",
				"??????????????????????",
				"??????????????",
				"??????????",
				"??????????????",
				"??????????????",
				"??????????????",
			],
		},
		months: {
			shorthand: [
				"??????",
				"??????",
				"????????",
				"??????",
				"??????",
				"????????",
				"????????",
				"??????",
				"??????",
				"??????",
				"??????",
				"??????",
			],
			longhand: [
				"????????????",
				"??????????????",
				"????????",
				"????????????",
				"??????",
				"????????",
				"????????",
				"????????????",
				"????????????????",
				"??????????????",
				"????????????",
				"??????????????",
			],
		},
		firstDayOfWeek: 1,
		ordinal: function () {
			return "";
		},
		rangeSeparator: " ??? ",
		weekAbbreviation: "??????.",
		scrollTitle: "???????????????????? ?????? ????????????????????",
		toggleTitle: "?????????????? ?????? ????????????????????????",
		amPM: ["????", "????"],
		yearAriaLabel: "??????",
		time_24hr: true,
	};
	let btn_next = `<button type="button" class="calendarBtn calendarBtn-next">
                        <span class="calendarBtn__inner">
							<svg><use xlink:href="../icons/stack/icons.svg#dropdown"></use></svg>
                        </span>
                    </button>`;

    let btn_prev = `<button type="button" class="calendarBtn calendarBtn-prev">
                        <span class="calendarBtn__inner">
							<svg><use xlink:href="../icons/stack/icons.svg#dropdown"></use></svg>
                        </span>
                    </button>`;
	if (document.querySelector("[data-personal-calendar]")) {
		Array.prototype.forEach.call(document.querySelectorAll('[data-personal-calendar]'), function(el){
			let parEl = el.closest('[data-calendar-wrap]').querySelector('[data-calendar-rel]');
			let site_calendar = flatpickr(el, {
				"locale": Russian,
				mode: "range",
				position: "below",
				monthSelectorType: "static",
				nextArrow: btn_next,
				prevArrow: btn_prev,
				altFormat: "d.m.Y",
				dateFormat: "d.m.Y",
				conjunction: " - ",
				appendTo: parEl,
				onOpen: function(selectedDates, dateStr, instance) {
					this.input.closest("[data-calendar-wrap]").classList.add("__active");
				},
				onClose: function(selectedDates, dateStr, instance) {
					this.input.closest("[data-calendar-wrap]").classList.remove("__active");
				},
			});
		})
	}
	$("body").on("click", "[data-input-collapsed-open]", function(){
		let this_rel = $(this).parents("[data-input-collapsed]");
		let this_dd = $(this).parents("[data-input-collapsed-content]");
		if ($(this).hasClass("__active")) {
			this_rel.removeClass("__active");
			this_rel.find("[data-input-collapsed-open]").removeClass("__active");
		}
		else {
			this_rel.addClass("__active");
			this_rel.find("[data-input-collapsed-open]").addClass("__active");
		}
	});
	$("body").on("change", "[data-input-collapsed-point]", function(){
		let this_rel = $(this).parents("[data-input-collapsed]");
		let this_inp = this_rel.find("[data-input-collapsed-main]");
		let this_cb_list = this_rel.find("[data-input-collapsed-point]");
		let list_length = this_cb_list.length;
		let last_checked_point;
		let check_counter = 0;
		let text = "??????"
		this_cb_list.each(function(){
			console.log($(this), $(this).prop("checked"))
			if ($(this).prop("checked")) {
				check_counter = check_counter + 1;
				last_checked_point = $(this)
			}
		});
		console.log(check_counter, list_length, text);

		if ((check_counter == 0) || (list_length == check_counter)) {
			text = "??????";
		}
		else if (check_counter == 1) {
			console.log(last_checked_point.parents(".filterPoint").find(".filterPoint__text"));
			text = last_checked_point.parents(".filterPoint").find(".filterPoint__text")[0].innerText;
		}
		else if (check_counter < 5) {
			text = `?????????????? ${check_counter} ??????????????`;
		}
		else {
			text = `?????????????? ${check_counter} ????????????????`;
		}
		this_inp.val(text);
	});
	$("[type='tel']").inputmask("+7 (999) 999 99 99", { 
		"clearIncomplete": true,
		"onincomplete": function(){
			if (this.value == "") {
				this.setAttribute("placeholder", "+7 (950) 375 22 98");
			}
		}
	});
	$("[type='tel']").attr("placeholder", "+7 (950) 375 22 98");

	// ???????????? ?????? ????????????????????????, ?????????? ??????????????
	if (document.querySelector("[data-example-input]")) {
		document.querySelector("[data-example-input]").addEventListener("click", function() {
			this.closest("[data-example-city]").classList.add("__active");
			console.log('focus')
		})
		document.body.addEventListener("click", function(e) {
			if (!e.target.closest("[data-example-city]")) {
				console.log('blur')
				document.querySelector("[data-example-city]").classList.remove("__active");
			}
		})
	}
})