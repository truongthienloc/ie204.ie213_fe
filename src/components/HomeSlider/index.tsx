'use client';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Image from 'next/image';
import { useRef } from 'react';
import Slider from 'react-slick';

import sliderBanners from '~/configs/banner';
import styles from '~/styles/home.module.scss';

function HomeSlider() {
  const sliderRef = useRef<any>(null);

  const handleNextSlide = () => {
    sliderRef.current?.slickNext();
  };

  const handleBackSlide = () => {
    sliderRef.current?.slickPrev();
  };

  return (
    <>
      <div className={styles['slider__container']}>
        <Slider
          ref={sliderRef}
          autoplay
          autoplaySpeed={2000}
          infinite
          cssEase="linear"
          slidesToShow={1}
          pauseOnHover
          slidesToScroll={1}
          className={styles.slider}
        >
          {sliderBanners.map((banner) => (
            <Image
              className={styles['slider-image']}
              key={banner?.id}
              src={banner?.image}
              alt={banner?.alt}
              width={50}
              height={50}
            />
          ))}
        </Slider>
        <div>
          <button className={styles['slider__btn--next']} onClick={handleNextSlide}>
            <ArrowForwardIosIcon style={{ color: '#fff' }} />
          </button>
          <button className={styles['slider__btn--prev']} onClick={handleBackSlide}>
            <ArrowBackIosNewIcon style={{ color: '#fff' }} />
          </button>
        </div>
      </div>
    </>
  );
}

export default HomeSlider;
