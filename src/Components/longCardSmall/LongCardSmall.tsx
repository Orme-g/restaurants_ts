import React from "react";

import { Link } from "react-router-dom";

import transformDate from "../../utils/transformDate";
// import pic from "../../assets/event.JPG";
import "./longCardSmall.scss";

import type { IEvent } from "../../types/eventTypes";
interface ICardData {
    data: IEvent;
}

const LongCardSmall: React.FC<ICardData> = ({ data }) => {
    const { _id, short_description, dateStart, dateFinish, title, title_image } = data;
    const [start, finish] = transformDate([dateStart, dateFinish]);
    const dateNow = new Date();
    const eventPassed = dateNow > new Date(dateFinish);
    return (
        <Link to={`/event/${_id}`}>
            <div className={`long-card-small__container ${eventPassed ? "event-passed" : null}`}>
                <div className="long-card-small__image">
                    <img src={title_image} alt="event" />
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
