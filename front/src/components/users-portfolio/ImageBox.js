import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Children } from 'react';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const ImageBox = ({ images }) => {
  return (
    <Swiper
      effect={'coverflow'}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={'auto'}
      pagination={true}
      modules={[Pagination]}
      className="mySwiper"
      autoHeight
      style={{ paddingBottom: '50px' }}
    >
      {Children.toArray(
        images.map((v) => (
          <SwiperSlide>
            <Image
              width={224}
              height={224}
              layout="responsive"
              unoptimized={true}
              src={v}
              alt={v}
            />
          </SwiperSlide>
        )),
      )}
    </Swiper>
  );
};
export default ImageBox;
