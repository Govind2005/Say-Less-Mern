// import { Swiper, SwiperSlide } from 'swiper/react';

// import 'swiper/css';
// import 'swiper/css/effect-coverflow';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';

// import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

// import slide_image_1 from '../assets/img_1.jpg';
// import slide_image_2 from '../assets/img_2.jpg';
// import slide_image_3 from '../assets/img_3.jpg';
// import slide_image_4 from '../assets/img_4.jpg';
// import slide_image_5 from '../assets/img_5.jpg';
// import slide_image_6 from '../assets/img_6.jpg';
// import slide_image_7 from '../assets/img_7.jpg';

// function Slider() {
//   return (
//     <div className="container h-[25%] w-[25%]">
//       <h1 className="heading">Flower Gallery</h1>
//       <Swiper
//   effect="coverflow"
//   grabCursor={true}
//   centeredSlides={true}
//   loop={true}
//   slidesPerView="auto"
//   coverflowEffect={{
//     rotate: 0,
//     stretch: 0,
//     depth: 100,
//     modifier: 2.5,
//   }}
//   pagination={{ el: '.swiper-pagination', clickable: true }}
//   navigation={{
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev',
//   }}
//   modules={[EffectCoverflow, Pagination, Navigation]}
//   className="swiper_container"
// >

//         <SwiperSlide>
//           <img src={slide_image_1} alt="slide_image" />
//         </SwiperSlide>
//         <SwiperSlide>
//           <img src={slide_image_2} alt="slide_image" />
//         </SwiperSlide>
//         <SwiperSlide>
//           <img src={slide_image_3} alt="slide_image" />
//         </SwiperSlide>
//         <SwiperSlide>
//           <img src={slide_image_4} alt="slide_image" />
//         </SwiperSlide>
//         <SwiperSlide>
//           <img src={slide_image_5} alt="slide_image" />
//         </SwiperSlide>
//         <SwiperSlide>
//           <img src={slide_image_6} alt="slide_image" />
//         </SwiperSlide>
//         <SwiperSlide>
//           <img src={slide_image_7} alt="slide_image" />
//         </SwiperSlide>

//         <div className="slider-controler">
//           <div className="swiper-button-prev slider-arrow">
//             <span>n</span>
//           </div>
//           <div className="swiper-button-next slider-arrow">
//             <p>p</p>
//           </div>
//           <div className="swiper-pagination"></div>
//         </div>
//       </Swiper>
//     </div>
//   );
// }

// export default Slider;