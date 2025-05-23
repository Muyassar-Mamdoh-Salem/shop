import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { AiOutlineRight } from 'react-icons/ai';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const bannerData = [
  {
    title: 'Men Collection',
    desc: 'Explore the latest trends for men with up to 40% off.',
    img: 'https://images.pexels.com/photos/2442883/pexels-photo-2442883.jpeg',
  },
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
  return (
    <div className="mt-[120px] sm:mt-[70px] max-w-full mx-auto overflow-hidden">
      <Swiper
        className="mySwiper w-full"
        modules={[Navigation, Autoplay, Pagination]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop
      >
        {bannerData.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[300px] sm:h-[500px]">
              <img
                className="w-full h-full object-cover"
                src={item.img}
                alt={item.title}
              />
              <div className="absolute inset-0 bg-black opacity-40"></div>
              <div className="absolute top-1/2 left-1/2 sm:left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-center text-white px-4 max-w-md">
                <h2 className="text-3xl sm:text-5xl font-bold mb-2">{item.title}</h2>
                <p className="mb-4 text-sm sm:text-lg">{item.desc}</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition flex items-center justify-center gap-2">
                    Shop Now <AiOutlineRight />
                  </button>
                  <button className="bg-white text-black px-5 py-2 rounded hover:bg-gray-200 transition">
                    View Collection
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
