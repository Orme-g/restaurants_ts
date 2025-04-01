import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";

// import pic from "../../assets/rest.jpeg";

import type { IRestaurant } from "../../types/restaurantsTypes";

import "./restaurantCardSmall.sass";
interface IRestaurantDataProps {
    restData: IRestaurant;
}
const RestaurantCardSmall: React.FC<IRestaurantDataProps> = ({ restData }) => {
    const { _id, name, rating, bill, cousine, title_image } = restData;
    const cousinesList = cousine.join(", ");
    const calculatedRating =
        rating.length === 0 ? 0 : rating.reduce((acc, num) => acc + num, 0) / rating.length;
    let displCousines: string;
    if (cousinesList.length < 40) {
        displCousines = cousinesList;
    } else {
        displCousines = cousinesList.slice(0, 40) + "...";
    }
    return (
        <div className="selection-card">
            <div
                className="selection-card__image"
                style={{ backgroundImage: `url(${title_image})` }}
                // style={{ backgroundImage: `url(${pic})` }}
            ></div>
            <div className="selection-card__title">{name}</div>
            <div className="selection-card__cousines">{displCousines}</div>
            <div className="selection-card__bill">{bill}₽</div>
            <div className="selection-card__rating">
                <Rating value={calculatedRating} size="small" readOnly precision={0.5} />
            </div>
            <Link to={`/restaurant/${_id}`} className="selection-card__link">
                Подробнее...
            </Link>
        </div>
    );
};

export default RestaurantCardSmall;
