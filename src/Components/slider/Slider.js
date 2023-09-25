import { useState } from 'react';

import {Swiper, SwiperSlide} from 'swiper/react'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './slider.sass'



const Slider = ({slides}) => {

    // const slides = ["https://mriyaresort.com/upload/_content/c15/rcbjw5rhe9slfmrajaai5px9u6xlwa0o.jpg", "https://www.restoclub.ru/uploads/place_thumbnail_big/a/4/8/4/a484eb0096162b04b1b6177b1a6b1058.jpg","https://media.admagazine.ru/photos/61a0e06f314e7e8b42d92952/master/w_1600%2Cc_limit/Volodin_614A7274-HDR-2.jpg", "https://prorus.ru/_/manager/files/630/52966f1ac1/01-result.jpg","https://img.restoclub.ru/uploads/place/3/9/2/8/3928281353245bf2afee9f703e78d747_w958_h835--big.jpg"]
    // const slides = []

    const [thumbsSwiper, setThumbsSwiper] = useState(null);


       const slideList = slides.map(item => {
            return (<SwiperSlide>
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
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mainGallery"
            >   
                    
                    {slideList}
                    {/* <SwiperSlide>
                        <img src="https://mriyaresort.com/upload/_content/c15/rcbjw5rhe9slfmrajaai5px9u6xlwa0o.jpg" alt='restaurant'/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://www.restoclub.ru/uploads/place_thumbnail_big/a/4/8/4/a484eb0096162b04b1b6177b1a6b1058.jpg" alt='restaurant'/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://media.admagazine.ru/photos/61a0e06f314e7e8b42d92952/master/w_1600%2Cc_limit/Volodin_614A7274-HDR-2.jpg" alt='restaurant'/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://prorus.ru/_/manager/files/630/52966f1ac1/01-result.jpg" alt='restaurant'/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://img.restoclub.ru/uploads/place/3/9/2/8/3928281353245bf2afee9f703e78d747_w958_h835--big.jpg" alt='restaurant'/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://hotel-spb.ru/assets/components/phpthumbof/cache/la-vue_prev.aae3fa6cf870ed5560b327306e80625b.jpg" alt='restaurant'/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://kudamoscow.ru/uploads/c0eaafc1660235d6de58011f424b395d.jpg" alt='restaurant'/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://rosakhutor.com/upload/iblock/01b/dy2crarcsr721my74ztp264y6pqtu6ug/Interer-veranda-varezhka.jpg" alt='restaurant'/>
                    </SwiperSlide> */}
            </Swiper>
            <Swiper
                // onSwiper={setThumbsSwiper}
                spaceBetween={5}
                slidesPerView={4}
                freeMode={true}
                loop={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="subGallery"
            >
                {slideList}
                {/* <SwiperSlide>
                    <img src="https://mriyaresort.com/upload/_content/c15/rcbjw5rhe9slfmrajaai5px9u6xlwa0o.jpg" alt='restaurant'/>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://www.restoclub.ru/uploads/place_thumbnail_big/a/4/8/4/a484eb0096162b04b1b6177b1a6b1058.jpg" alt='restaurant'/>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://media.admagazine.ru/photos/61a0e06f314e7e8b42d92952/master/w_1600%2Cc_limit/Volodin_614A7274-HDR-2.jpg" alt='restaurant'/>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://prorus.ru/_/manager/files/630/52966f1ac1/01-result.jpg" alt='restaurant'/>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://img.restoclub.ru/uploads/place/3/9/2/8/3928281353245bf2afee9f703e78d747_w958_h835--big.jpg" alt='restaurant'/>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://hotel-spb.ru/assets/components/phpthumbof/cache/la-vue_prev.aae3fa6cf870ed5560b327306e80625b.jpg" alt='restaurant'/>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://kudamoscow.ru/uploads/c0eaafc1660235d6de58011f424b395d.jpg" alt='restaurant'/>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://rosakhutor.com/upload/iblock/01b/dy2crarcsr721my74ztp264y6pqtu6ug/Interer-veranda-varezhka.jpg" alt='restaurant'/>
                </SwiperSlide> */}
            </Swiper>
        </div>
    )
}


export default Slider