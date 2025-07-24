import React from "react";
import { Link } from "react-router-dom";
import "./restaurantCardBig.scss";
import { IRestaurant } from "../../types/restaurantsTypes";

interface IRestaurantCardProps {
    data: IRestaurant;
}

const RestaurantCardBig: React.FC<IRestaurantCardProps> = ({ data }) => {
    const { _id, name, short_description, title_image } = data;
    return (
        <div className="restaurant-card">
            <div
                className="restaurant-card__image"
                style={{ backgroundImage: `url(${title_image})` }}
            ></div>
            <div className="restaurant-card__title">{name}</div>
            <div className="restaurant-card__description">{short_description}</div>
            <Link to={`/restaurant/${_id}`} className="restaurant-card__link">
                Подробнее...
            </Link>
        </div>
    );
};

export default RestaurantCardBig;
