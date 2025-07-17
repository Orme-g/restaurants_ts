import React from "react";
import { Link } from "react-router-dom";

import { useGetLastAddedRestaurantsQuery } from "../../services/restaurantsApi";
import { CardsSkeleton } from "../skeletons/Skeletons";

// import pic from "../../assets/rest.jpeg";

import "./restaurantCardBig.scss";
import { IRestaurant } from "../../types/restaurantsTypes";

const RestaurantCardBig: React.FC = () => {
    const { data: lastAddedRestaurants } = useGetLastAddedRestaurantsQuery(6);
    if (!lastAddedRestaurants) {
        return <CardsSkeleton />;
    }

    const makeRestaurantCard = (item: IRestaurant) => {
        const { _id, name, short_description, title_image } = item;
        return (
            <div className="restaurant-card" key={_id}>
                <div
                    className="restaurant-card__image"
                    style={{ backgroundImage: `url(${title_image})` }}
                    // style={{ backgroundImage: `url(${pic})` }}
                ></div>
                <div className="restaurant-card__title">{name}</div>
                <div className="restaurant-card__description">{short_description}</div>
                <Link to={`/restaurant/${_id}`} className="restaurant-card__link">
                    Подробнее...
                </Link>
            </div>
        );
    };

    const elements = lastAddedRestaurants.map((item) => {
        return makeRestaurantCard(item);
    });

    return <>{elements}</>;
};

export default RestaurantCardBig;
