import React from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../types/store";
// import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { fetchLastAddedRestaurants } from "../../reducers/restaurants";
import { CardsSkeleton } from "../skeletons/Skeletons";

import pic from "../../assets/rest.jpeg";

import "./restaurantCardBig.sass";
import { IRestaurant } from "../../types/restaurantsTypes";

const RestaurantCardBig: React.FC = () => {
    const dispatch = useAppDispatch();
    const { lastAddedRestaurants, pageLoading } = useAppSelector((state) => state.restaurants);
    useEffect(() => {
        dispatch(fetchLastAddedRestaurants());
        // eslint-disable-next-line
    }, []);

    if (pageLoading === "loading" || !lastAddedRestaurants) {
        return <CardsSkeleton />;
    }

    const makeRestaurantCard = (item: IRestaurant) => {
        const { _id, name, short_description, title_image } = item;
        return (
            <div className="restaurant-card" key={_id}>
                <div
                    className="restaurant-card__image"
                    // style={{ backgroundImage: `url(${title_image})` }}
                    style={{ backgroundImage: `url(${pic})` }}
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
