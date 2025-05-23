import React from 'react';
import Slider from 'react-slick';
import { AiOutlineRight } from 'react-icons/ai';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const slides = [
  {
    title: 'Women Fashion',
    desc: 'Stylish outfits for modern women – up to 50% off.',
    img: 'https://images.pexels.com/photos/6311390/pexels-photo-6311390.jpeg',
  },
  {
    title: 'Kids Special',
    desc: 'Cute and comfy wear for kids – shop now.',
    img: 'https://images.pexels.com/photos/3661357/pexels-photo-3661357.jpeg',
  },
  {
    title: 'Electronics Sale',
    desc: 'Best deals on phones, tablets & more.',
    img: 'https://images.pexels.com/photos/1054397/pexels-photo-1054397.jpeg',
  },
  {
    title: 'Accessories & More',
    desc: 'Bags, watches & everything in between.',
    img: 'https://images.pexels.com/photos/5705493/pexels-photo-5705493.jpeg',
  },
];

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="mt-[70px] max-w-[1200px] mx-auto px-4"> {/* Added px-4 to prevent edge overflow */}
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative h-[300px] sm:h-[500px] overflow-hidden rounded-lg">
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
            <div
              className="
                absolute top-1/2 left-1/2 sm:left-1/4
                transform -translate-x-1/2 -translate-y-1/2
                text-white
                text-center sm:text-left
                max-w-[90vw] sm:max-w-md
                px-4
              "
              style={{ wordWrap: 'break-word' }} // لعدم خروج النصوص من الإطار
            >
              <h2 className="text-2xl sm:text-5xl font-bold mb-2 leading-tight">{slide.title}</h2>
              <p className="mb-4 text-sm sm:text-xl leading-relaxed">{slide.desc}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
                <button className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition flex items-center gap-2 justify-center">
                  Shop Now <AiOutlineRight />
                </button>
                <button className="bg-white text-black px-5 py-2 rounded hover:bg-gray-200 transition">
                  View Collection
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
