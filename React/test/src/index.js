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
  var imgPaths = ['/v2/imgs/zelda.png', '/v2/imgs/zelda.png', '/v2/imgs/zelda.png', '/v2/imgs/zelda.png', '/v2/imgs/zelda.png'];

  var PATH = '/v2/imgs/zelda.png';

  var SwiperSlides = imgPaths.map(function (path, i) {
    return React.createElement(
      SwiperSlide,
      { key: i },
      React.createElement('img', { src: path })
    );
  });

  return React.createElement(
    Swiper,
    {
      spaceBetween: 50,
      slidesPerView: 1,
      navigation: true,
      pagination: { clickable: true }
      // scrollbar={{ draggable: true }}
      , onSwiper: function onSwiper(swiper) {
        return console.log(swiper);
      },
      onSlideChange: function onSlideChange() {
        return console.log('slide change');
      }
    },
    SwiperSlides
  );
};

var App = function App(props) {
  return React.createElement(MeetingIdeaGuide, null);
};

var domContainer = document.querySelector('#root');
ReactDOM.render(React.createElement(MeetingIdeaGuide, null), domContainer);