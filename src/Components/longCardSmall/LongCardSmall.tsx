import React from "react";

import { Link } from "react-router-dom";

import transformDate from "../../utils/transformDate";
import pic from "../../assets/event.JPG";
import "./longCardSmall.sass";

import type { IEvent } from "../../types/eventTypes";
interface ICardData {
    data: IEvent;
}

const LongCardSmall: React.FC<ICardData> = ({ data }) => {
    const { _id, short_description, dateStart, dateFinish, title } = data;
    const [start, finish] = transformDate([dateStart, dateFinish]);
    return (
        <Link to={`/event/${_id}`}>
            <div className="long-card-small__container">
                <div className="long-card-small__image">
                    <img src={pic} alt="event" />
                </div>
                <div className="long-card-small__info">
                    <div className="long-card-small__info_name">{title}</div>
                    <div className="long-card-small__info_description">{short_description}</div>
                    <div className="long-card-small__info_valid-dates">
                        C {start} по {finish}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default LongCardSmall;
