import { Link } from "react-router-dom"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, FreeMode } from "swiper/modules"
import { Rating } from "@mui/material"
import { useGetSortedRestaurantsQuery } from "../../services/apiSlice"

import Spinner from "../spinner/Spinner"

import "./sliderCards.sass"

const SliderCards = ({ type }) => {
    const { data: sortedRestaurants, isLoading } =
        useGetSortedRestaurantsQuery(type)

    if (isLoading) {
        return <Spinner />
    }

    const slides = sortedRestaurants.map((item) => {
        const { _id, title_image, name, rating } = item
        return (
            <SwiperSlide className="card-slide" key={_id}>
                <div className="selection-card">
                    <div
                        className="selection-card__image"
                        style={{ backgroundImage: `url(${title_image})` }}
                    ></div>
                    <div className="selection-card__title">{name}</div>
                    <div className="selection-card__rating">
                        <Rating
                            value={rating}
                            size="small"
                            readOnly
                            precision={0.1}
                        />
                    </div>
                    <Link
                        to={`/restaurant/${_id}`}
                        className="selection-card__link"
                    >
                        Подробнее...
                    </Link>
                </div>
            </SwiperSlide>
        )
    })

    return (
        <>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                style={{
                    "--swiper-navigation-color": "#c9c9c9",
                }}
                loop={true}
                navigation={true}
                freeMode={true}
                modules={[Navigation, Pagination, FreeMode]}
                className="cards-gallery"
            >
                {slides}
            </Swiper>
        </>
    )
}

export default SliderCards
