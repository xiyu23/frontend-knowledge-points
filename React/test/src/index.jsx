import React from 'react';
import ReactDOM from 'react-dom';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// // Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);


function MeetingIdeaGuide() {
  const imgPaths = [
    '/v2/imgs/zelda.png',
    '/v2/imgs/zelda.png',
    '/v2/imgs/zelda.png',
    '/v2/imgs/zelda.png',
    '/v2/imgs/zelda.png',
  ];

  const PATH = '/v2/imgs/zelda.png';

  const SwiperSlides = imgPaths.map((path, i) => (
      <SwiperSlide key={i}>
        <img src={path} />
      </SwiperSlide>
  ));

  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      // scrollbar={{ draggable: true }}
      onSwiper={swiper => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      {SwiperSlides}

      {/* <SwiperSlide><img src={PATH} className={styles.guideImg} /></SwiperSlide>
      <SwiperSlide><img src={PATH} className={styles.guideImg} /></SwiperSlide>
      <SwiperSlide><img src={PATH} className={styles.guideImg} /></SwiperSlide>
      <SwiperSlide><img src={PATH} className={styles.guideImg} /></SwiperSlide>
      <SwiperSlide><img src={PATH} className={styles.guideImg} /></SwiperSlide> */}

      {/* <SwiperSlide>1</SwiperSlide>
      <SwiperSlide>2</SwiperSlide>
      <SwiperSlide>3</SwiperSlide>
      <SwiperSlide>4</SwiperSlide>
      <SwiperSlide>5</SwiperSlide> */}

      {/* <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide> */}

    </Swiper>
  );
};

const App = function(props) {
  return (
    <MeetingIdeaGuide />
  );
}

const domContainer = document.querySelector('#root');
ReactDOM.render(<MeetingIdeaGuide />, domContainer);