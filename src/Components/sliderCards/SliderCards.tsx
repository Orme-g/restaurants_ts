import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, FreeMode } from "swiper/modules";
import { useGetSortedRestaurantsQuery } from "../../services/apiSlice";

import { CardsSliderSkeleton } from "../skeletons/Skeletons";
import RestaurantCardSmall from "../restaurantCardSmall/RestaurantCardSmall";
// import ServerError from "../pages/ServerError"

// import pic from "../../assets/rest_photos/cristal/cris_1.jpeg"

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
              const { _id } = item;
              return (
                  <SwiperSlide className="card-slide" key={_id}>
                      <RestaurantCardSmall restData={item} />
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
                    "--swiper-navigation-color": "#c9c9c9",
                } as React.CSSProperties
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
