import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, FreeMode } from "swiper/modules";
import { useGetSortedRestaurantsQuery } from "../../services/restaurantsApi";

import { CardsSliderSkeleton } from "../skeletons/Skeletons";
import RestaurantCardSmall from "../restaurantCardSmall/RestaurantCardSmall";
import type { TSortRestaurants } from "../../types/restaurantsTypes";
// import pic from "../../assets/rest_photos/cristal/cris_1.jpeg"

interface ISliderCardsProps {
    sortType: TSortRestaurants;
    cardsNumber: number;
}

const SliderCards: React.FC<ISliderCardsProps> = ({ sortType, cardsNumber }) => {
    const {
        data: sortedRestaurants,
        isLoading,
        isError,
    } = useGetSortedRestaurantsQuery({ sortType, cardsNumber });

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
            spaceBetween={20}
            style={
                {
                    "--swiper-navigation-color": "#c9c9c9",
                    // height: "fit-content",
                    paddingTop: "20px",
                    paddingBottom: "20px",
                } as React.CSSProperties
            }
            breakpoints={{
                0: {
                    slidesPerView: 2,
                },
                480: {
                    slidesPerView: 2,
                },
                760: {
                    slidesPerView: 3,
                },
                980: {
                    slidesPerView: 4,
                },
                1480: {
                    slidesPerView: 5,
                    spaceBetween: 40,
                },
            }}
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
