import React from "react";
import { memo } from "react";
import { Rating } from "@mui/material";

import type { IRestaurant } from "../../types/restaurantsTypes";
import "./restSideInfo.sass";

interface ISideInfoProps {
    data: IRestaurant;
}

const RestSideInfo: React.FC<ISideInfoProps> = memo(({ data }) => {
    let { cousine, rating, adress, bill, phone } = data;

    const cousineList: string = cousine.join(", ");

    return (
        <div className="rest-side-info__container">
            <div className="rest-side-info__rating">
                Рейтинг: <br /> <Rating name="read-only" value={rating} precision={0.1} readOnly />
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
                Средний чек: <span>{bill} &#8381;</span>
            </div>
            <div className="rest-side-info__item">
                Телефон: <span>{phone}</span>
            </div>
        </div>
    );
});

export default RestSideInfo;
