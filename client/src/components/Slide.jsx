
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

export default function App() {
  return (
    <div className="w-full mx-auto mt-10 h-[8cm]"> 
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}  // keeps it infinite
        speed={3000} // how long it takes to slide (ms)
        autoplay={{
          delay: 0, // no pause between slides
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="rounded-2xl shadow-lg"
      >
        <SwiperSlide>
          <img
            src="https://051edfee763c558a6586-1f1d5ce824a176e93f42bb75edca05f7.ssl.cf1.rackcdn.com/mixt-food-photographer-healthy.jpg"
            alt="samosa"
            className="w-full h-64 object-cover rounded-2xl"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://wallpaperswide.com/download/good_food-wallpaper-1024x576.jpg"
            alt="puffs"
            className="w-full h-64 object-cover rounded-2xl"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://www.lechoux.com/cdn/shop/files/LeChoux_MelisaCoppola_2025_April_29_1_df3f0d8c-3d55-4ab0-a6bb-71205186b987.png?v=1745686536&width=1500"
            alt="cutlet"
            className="w-full h-64 object-cover rounded-2xl"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
