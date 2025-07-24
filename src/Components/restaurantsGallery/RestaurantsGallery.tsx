import React from "react";
import RestaurantCardBig from "../restaurantCardBig/RestaurantCardBig";
import { useGetLastAddedRestaurantsQuery } from "../../services/restaurantsApi";
import { CardsSkeleton } from "../skeletons/Skeletons";

import "./restaurantsGallery.scss";

const RestaurantsGallery: React.FC = () => {
    const { data: lastAddedRestaurants } = useGetLastAddedRestaurantsQuery(6);
    if (!lastAddedRestaurants) {
        return <CardsSkeleton />;
    }
    const restaurantCards = lastAddedRestaurants.map((restaurantData) => {
        const { _id } = restaurantData;
        return <RestaurantCardBig key={_id} data={restaurantData} />;
    });
    return (
        <>
            <section className="restaurant-gallery">
                <div className="restaurant-gallery__title">Последние добавленные рестораны</div>
                <div className="restaurant-gallery__cards-list">{restaurantCards}</div>
            </section>
        </>
    );
};

export default RestaurantsGallery;
