// начало - полифил для edge
(function (ELEMENT) {
	ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector;
	ELEMENT.closest = ELEMENT.closest || function closest(selector) {
		if (!this) return null;
		if (this.matches(selector)) return this;
		if (!this.parentElement) { return null }
		else return this.parentElement.closest(selector)
	};
}(Element.prototype));
// конец - полифил для edge
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
			window.scrollTo(0, start_offset_top);
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
	$("body").on("click", "[data-tooltip]", function(){
		$(".tippy-content").mCustomScrollbar({})
	});
});