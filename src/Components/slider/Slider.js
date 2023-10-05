import { useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';

import {Swiper, SwiperSlide} from 'swiper/react'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';


import './slider.sass'



const Slider = ({slides}) => {

    // eslint-disable-next-line
    const [thumbsSwiper, setThumbsSwiper] = useState(null);


       const slideList = slides.map(item => {
            const id = nanoid()
            return (<SwiperSlide key={id}>
            <img src={item} alt='restaurant'/>
            </SwiperSlide>)
        })

    return (
        <div className="slider__container">
            <Swiper
                style={{
                '--swiper-navigation-color': '#fff',
                '--swiper-pagination-color': '#fff',
                }}
                loop={true}
                spaceBetween={10}
                navigation={true}
                modules={[FreeMode, Navigation, Thumbs]}
                // thumbs={{ swiper: thumbsSwiper }}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                className="mainGallery"
            > 
                    {slideList}
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={5}
                slidesPerView={4}
                freeMode={true}
                loop={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="subGallery"
            >
                {slideList}
            </Swiper>
        </div> 
    )
}


export default Slider