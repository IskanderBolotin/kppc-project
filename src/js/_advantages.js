$(document).ready(function() {
  let arrow_ico = '<svg viewBox="0 0 24 11.4"><path d="M18.3,11.4,16.9,10l3.3-3.3H0v-2H20.2L16.9,1.4,18.3,0,24,5.7Z"/></svg>';
  let arrow_prev = '<button class="sliderArrow sliderArrow-prev"><span class="sliderArrow__inner">' + arrow_ico + '</span></button>';
  let arrow_next = '<button class="sliderArrow sliderArrow-next"><span class="sliderArrow__inner">' + arrow_ico + '</span></button>';
  $(".advantageList-slider").slick({
      dots: false,
      infinite: true,
      arrows: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      swipeToSlide: true,
      prevArrow: arrow_prev,
      nextArrow: arrow_next,
      responsive: [
        {
          breakpoint: 1301,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 999,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          }
        },
      ]
  });
          
});