import React, { useState, memo } from "react";
import { nanoid } from "@reduxjs/toolkit";

import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperCore } from "swiper/types";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import pic from "../../assets/rest.jpeg";
// import * as data from "../../services/importModule"
import "./slider.scss";

interface ISliderProps {
    images: string[];
}

const Slider: React.FC<ISliderProps> = memo(({ images }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);
    // useEffect(() => {
    //     if (thumbsSwiper) {
    //         thumbsSwiper.update();
    //     }
    // }, [thumbsSwiper]);

    const slideList = images.map((item) => {
        const id = nanoid();
        return (
            <SwiperSlide key={id}>
                <img src={item} alt="restaurant" />
                {/* <img src={pic} alt="restaurant" /> */}
            </SwiperSlide>
        );
    });

    return (
        <>
            <Swiper
                style={
                    {
                        "--swiper-navigation-color": "#fff",
                        "--swiper-pagination-color": "#fff",
                    } as React.CSSProperties
                }
                loop={true}
                spaceBetween={10}
                navigation={true}
                modules={[FreeMode, Navigation, Thumbs]}
                // thumbs={{
                //     swiper: thumbsSwiper ? thumbsSwiper : undefined,
                // }}
                thumbs={{
                    swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
                }}
                className="mySwiper2"
            >
                {slideList}
            </Swiper>
            <Swiper
                onSwiper={(swiper: SwiperCore) => setThumbsSwiper(swiper)}
                spaceBetween={5}
                slidesPerView={4}
                freeMode={true}
                loop={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                {slideList}
            </Swiper>
        </>
    );
});

export default Slider;
