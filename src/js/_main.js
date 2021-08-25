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
});