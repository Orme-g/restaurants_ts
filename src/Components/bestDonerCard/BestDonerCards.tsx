import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import { useGetDonersListQuery } from "../../services/donersApi";
import { DonerCardsSkeleton } from "../skeletons/Skeletons";

import type { IDonerRestaurant } from "../../types/donersTypes";
// import pic from "../../assets/rest_photos/ille/ille_1.jpeg"
import "./bestDonerCards.sass";

const BestDonerCards: React.FC = () => {
    const { data: allDonersData, isLoading, isError } = useGetDonersListQuery(null);

    if (isLoading || isError) {
        return <DonerCardsSkeleton />;
    }

    const donerCards = allDonersData
        ? allDonersData.map((item) => {
              return createDonerCard(item);
          })
        : null;

    function createDonerCard(card: IDonerRestaurant) {
        const { _id, name, rating, short_description, title_image, createdAt } = card;
        const date = new Date(createdAt).toLocaleString("ru", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
        return (
            <Link to={`/best-doner/${_id}`} key={_id}>
                <div className="best-doner-card__container">
                    <div className="best-doner-card__picture">
                        <img src={title_image} alt="doner" />
                        {/* <img src={pic} alt="doner" /> */}
                    </div>
                    <div className="best-doner-card__info">
                        <div className="best-doner-card__header">
                            <div className="best-doner-card__title">{name}</div>
                            <div className="best-doner-card__added">{date}</div>
                        </div>
                        <div className="best-doner-card__description">{short_description}</div>
                        <div className="best-doner-card__rating">
                            <Rating value={rating} precision={0.5} readOnly />
                        </div>
                    </div>
                </div>
            </Link>
        );
    }

    return <>{donerCards}</>;
};

export default BestDonerCards;
