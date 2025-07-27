import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import transformDate from "../../utils/transformDate";
import "./longCard.scss";

interface ILongCardProps {
    data: any;
    type: "restaurant" | "doner";
}

const LongCard: React.FC<ILongCardProps> = ({ data, type }) => {
    const {
        name,
        title_image,
        short_description,
        averageRating,
        rating,
        cousine,
        bill,
        createdAt,
        _id,
    } = data;
    const link = type === "doner" ? `/best-doner/${_id}` : `/restaurant/${_id}`;

    const donerOrRestRating =
        type === "restaurant" ? averageRating : type === "doner" ? rating : null;
    const date = transformDate(createdAt);
    const textField = (type: "restaurant" | "doner") => {
        switch (type) {
            case "restaurant":
                return (
                    <>
                        {short_description}
                        <div className="wrapper">
                            <div className="label">Кухня:</div>
                            <div className="text">{cousine.join(", ")}</div>
                        </div>
                        <div className="wrapper">
                            <div className="label">Средний чек: </div>
                            <div className="text">{bill} &#8381;</div>
                        </div>
                    </>
                );
            case "doner":
                return short_description;
            default:
                return null;
        }
    };
    return (
        <Link to={link}>
            <div className="long-card__container">
                <div className="long-card__picture">
                    <img src={title_image} alt="doner" />
                </div>
                <div className="long-card__info">
                    <div className="long-card__header">
                        <div className="long-card__title">{name}</div>
                        <div className="long-card__added">{date}</div>
                    </div>
                    <div className="long-card__textfield">{textField(type)}</div>
                    <div className="long-card__rating">
                        <Rating value={donerOrRestRating} precision={0.5} readOnly />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default LongCard;
