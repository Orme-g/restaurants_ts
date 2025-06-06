import React from "react";
import { memo } from "react";
import { IconButton, Rating } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import type { IRestaurant } from "../../types/restaurantsTypes";
import "./restSideInfo.scss";

interface ISideInfoProps {
    data: IRestaurant;
    isFavourite: "idle" | boolean;
    favouriteHandler: (name: string) => void;
    isRegistered: boolean;
}

const RestSideInfo: React.FC<ISideInfoProps> = memo(
    ({ data, isFavourite, favouriteHandler, isRegistered }) => {
        const { cousine, rating, adress, subway, bill, phone, name } = data;
        // const { marks, overallRating } = rating;
        const calculatedRating =
            rating.length === 0 ? 0 : rating.reduce((acc, num) => acc + num, 0) / rating.length;
        const cousineList: string = cousine.join(", ");

        return (
            <div className="rest-side-info__container">
                {isRegistered ? (
                    <IconButton
                        className="rest-side-info__favorite-icon"
                        onClick={() => favouriteHandler(name)}
                    >
                        {isFavourite === "idle" ? null : isFavourite === true ? (
                            <FavoriteIcon fontSize="large" />
                        ) : (
                            <FavoriteBorderIcon fontSize="large" />
                        )}
                    </IconButton>
                ) : null}

                <div className="rest-side-info__rating">
                    Рейтинг: <br />{" "}
                    <div className="rest-side-info__rating_stars-and-marks">
                        <div>
                            <Rating
                                name="read-only"
                                value={calculatedRating}
                                precision={0.1}
                                readOnly
                            />
                        </div>

                        <div className="rest-side-info__rating_marks-amount">({rating.length})</div>
                    </div>
                </div>

                <div className="rest-side-info__item">
                    Кухня: <span>{cousineList}</span>
                </div>
                <div className="rest-side-info__item">
                    Время работы: <br />
                    <span>ПН-ЧТ: 10:00 - 22:00</span>
                    <br />
                    <span>ПТ-ВС: 10:00 - 00:00</span>
                </div>
                <div className="rest-side-info__item">
                    Адрес: <span>{adress}</span>
                </div>
                <div className="rest-side-info__item">
                    {/* Метро: <span>{subway}</span> */}
                    Метро:
                    {subway.map((station) => (
                        <span className="subway" key={station}>
                            {station}
                        </span>
                    ))}
                </div>
                <div className="rest-side-info__item">
                    Средний чек: <span>{bill} &#8381;</span>
                </div>
                <div className="rest-side-info__item">
                    Телефон: <span>{phone}</span>
                </div>
            </div>
        );
    }
);

export default RestSideInfo;
