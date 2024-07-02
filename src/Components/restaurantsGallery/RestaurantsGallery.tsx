import React from "react";
import RestaurantCard from "../restaurantCardBig/RestaurantCardBig";

import "./restaurantsGallery.sass";

const RestaurantsGallery: React.FC = () => {
    return (
        <>
            <section className="restaurant-gallery">
                <div className="restaurant-gallery__title">Последние добавленные рестораны</div>
                <div className="restaurant-gallery__cards">
                    <RestaurantCard />
                </div>
            </section>
        </>
    );
};

export default RestaurantsGallery;
