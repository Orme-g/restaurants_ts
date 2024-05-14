import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, FreeMode } from "swiper/modules";
import { Rating } from "@mui/material";
import { useGetSortedRestaurantsQuery } from "../../services/apiSlice";

import { CardsSliderSkeleton } from "../skeletons/Skeletons";
// import ServerError from "../pages/ServerError"

// import pic from "../../assets/rest_photos/cristal/cris_1.jpeg"
import "./sliderCards.sass";

interface ISliderCardsProps {
    type: string;
}

const SliderCards: React.FC<ISliderCardsProps> = ({ type }) => {
    const { data: sortedRestaurants, isLoading, isError } = useGetSortedRestaurantsQuery(type);

    if (isLoading || isError) {
        return <CardsSliderSkeleton />;
    }

    const slides = sortedRestaurants
        ? sortedRestaurants.map((item) => {
              const { _id, title_image, name, rating } = item;
              return (
                  <SwiperSlide className="card-slide" key={_id}>
                      <div className="selection-card">
                          <div
                              className="selection-card__image"
                              style={{ backgroundImage: `url(${title_image})` }}
                              // style={{ backgroundImage: `url(${pic})` }}
                          ></div>
                          <div className="selection-card__title">{name}</div>
                          <div className="selection-card__rating">
                              <Rating value={rating} size="small" readOnly precision={0.5} />
                          </div>
                          <Link to={`/restaurant/${_id}`} className="selection-card__link">
                              Подробнее...
                          </Link>
                      </div>
                  </SwiperSlide>
              );
          })
        : null;

    return (
        <Swiper
            slidesPerView={4}
            spaceBetween={30}
            style={
                {
                    // "--swiper-navigation-color": "#c9c9c9",
                }
            }
            loop={true}
            navigation={true}
            freeMode={true}
            modules={[Navigation, Pagination, FreeMode]}
            className="cards-gallery"
        >
            {slides}
        </Swiper>
    );
};

export default SliderCards;
