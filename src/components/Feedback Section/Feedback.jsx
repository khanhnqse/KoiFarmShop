import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const TestimonialData = [
  {
    id: 1,
    name: "Alice Johnson",
    text: "The koi fish I received are absolutely stunning. Their vibrant colors have truly brought my pond to life, and they arrived in perfect health.",
    img: "https://picsum.photos/101/101",
  },
  {
    id: 2,
    name: "David Thompson",
    text: "I am really impressed with the quality of koi fish. They were well-packaged, healthy, and adjusted quickly to their new environment.",
    img: "https://picsum.photos/102/102",
  },
  {
    id: 3,
    name: "Emily Carter",
    text: "These koi are beyond beautiful! Their patterns and colors are amazing, and they have settled into the pond so easily.",
    img: "https://picsum.photos/104/104",
  },
  {
    id: 5,
    name: "James Lee",
    text: "I’ve purchased koi from many places, but these are by far the best. The fish are healthy, lively, and exactly as described. ",
    img: "https://picsum.photos/103/103",
  },
];

const Testimonials = () => {
  var settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="py-10 mb-10">
      <div className="container">
        <div data-aos="zoom-in">
          <Slider {...settings}>
            {TestimonialData.map((data) => (
              <div key={data.id} className="my-6">
                <div className="flex flex-col gap-4 shadow-lg py-8 px-6 mx-4 rounded-xl dark:bg-gray-800 bg-primary/10 relative">
                  <div className="mb-4">
                    <img
                      src={data.img}
                      alt=""
                      className="rounded-full w-20 h-20"
                    />
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <div className="space-y-3">
                      <p className="text-xs text-white">{data.text}</p>
                      <h1 className="text-xl font-bold text-white dark:text-light">
                        {data.name}
                      </h1>
                    </div>
                  </div>
                  <p className="text-white/20 text-9xl font-serif absolute top-0 right-0">
                    ,,
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
