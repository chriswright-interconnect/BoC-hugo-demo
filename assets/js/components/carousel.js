import $ from "jquery";
import "slick-carousel";

const $carousel = $(".quotes-slider__list");

if ($carousel.length) {
    $carousel.slick({
        useTransform: true,
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        centerPadding: 0,
        centerMode: true,
        prevArrow: '<button type="button" class="slick-prev" aria-label="Previous"></button>',
        nextArrow: '<button type="button" class="slick-next" aria-label="Next"></button>',
        responsive: [
            {
                breakpoint: 760,
                settings: {
                    centerMode: false,
                    arrows: false,
                },
            },
        ],
    });
}
