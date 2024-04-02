'use client'
import { LegacyRef, useRef } from 'react'
import styles from '~/styles/home.module.scss'
import Slider from 'react-slick'
import Image from 'next/image'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

import { sliderBanners } from '~/data'

function HomeSlider() {
    const sliderRef: LegacyRef<Slider> | undefined = useRef(null)

    const handleNextSlide = () => {
        sliderRef.current?.slickNext()
    }

    const handleBackSlide = () => {
        sliderRef.current?.slickPrev()
    }

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
    )
}

export default HomeSlider
