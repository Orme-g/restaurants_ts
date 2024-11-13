import React from "react";

import { useParams } from "react-router-dom";
import { useGetEventQuery } from "../../services/eventsApi";
import CommentsBlock from "../../Components/commentsBlock/CommentsBlock";
import transformDate from "../../utils/transformDate";

import image from "../../../src/assets/event.JPG";

import "./singleEventPage.sass";

const SingleEventPage: React.FC = () => {
    const { eventId } = useParams();
    console.log(eventId);
    const { data: eventData, isLoading } = useGetEventQuery(eventId as string);
    if (isLoading) {
        return;
    }
    const { eventName, restaurantName, dateStart, dateFinish, description, createdAt } = eventData!;
    const [start, finish, added] = transformDate([dateStart, dateFinish, createdAt]);
    return (
        <>
            <div className="page-wrapper">
                <div className="event-info__container">
                    <div className="event-info__name">{eventName}</div>
                    <div className="event-info__wrapper">
                        <div className="event-info__title">Где проходит: </div>
                        <div className="event-info__text">Ресторан {restaurantName}</div>

                        <div className="event-info__title">Когда проходит:</div>
                        <div className="event-info__text">
                            C <span>{start}</span> до <span>{finish}</span>
                        </div>
                    </div>

                    <div className="event-info__image">
                        <img src={image} alt="event" />
                    </div>
                    <div className="event-info__descr-added-wrapper">
                        <div className="event-info__description">{description}</div>
                        <div className="event-info__added">
                            Добавлено: <span>{added}</span>
                        </div>
                    </div>

                    <div className="event-info__leave-comment">
                        Уже побывали на событии? Пoделитесь впечатлениями!
                    </div>
                </div>
                <div className="event-info__comments">
                    <CommentsBlock currentTopicId={eventId!} />
                </div>
            </div>
        </>
    );
};

export default SingleEventPage;
