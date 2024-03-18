import { useState, memo } from "react"
import { nanoid } from "@reduxjs/toolkit"

import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode, Navigation, Thumbs } from "swiper/modules"
// import pic from "../../assets/rest_photos/terrase/terr_2.jpeg"
// import * as data from "../../services/importModule"
import "./slider.sass"

const Slider = memo(({ images }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null)

    const slideList = images.map((item) => {
        const id = nanoid()
        return (
            <SwiperSlide key={id}>
                <img src={item} alt="restaurant" />
                {/* <img src={pic} alt="restaurant" /> */}
            </SwiperSlide>
        )
    })
    // const imgList = Object.values(data)
    // const slideList = imgList.map((item) => {
    //     const id = nanoid()
    //     return (
    //         <SwiperSlide key={id}>
    //             <img src={item} alt="restaurant" />
    //         </SwiperSlide>
    //     )
    // })

    return (
        <>
            <Swiper
                style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                }}
                loop={true}
                spaceBetween={10}
                navigation={true}
                modules={[FreeMode, Navigation, Thumbs]}
                // thumbs={{ swiper: thumbsSwiper }}
                thumbs={{
                    swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
                }}
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
        </>
    )
})

export default Slider
