import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Custom arrows for slider
function NextArrow(props) {
    const { onClick } = props;
    return (
        <div
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full w-10 h-10 flex items-center justify-center text-white transition-all duration-300 transform hover:scale-110"
            onClick={onClick}
        >
            <FaChevronRight />
        </div>
    );
}

function PrevArrow(props) {
    const { onClick } = props;
    return (
        <div
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full w-10 h-10 flex items-center justify-center text-white transition-all duration-300 transform hover:scale-110"
            onClick={onClick}
        >
            <FaChevronLeft />
        </div>
    );
}
// Slider settings for "Now Showing"
export const nowShowingSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};

// Slider settings for "Coming Soon"
export const comingSoonSettings = {
    ...nowShowingSettings
};
