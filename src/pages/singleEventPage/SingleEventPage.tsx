import React from "react";

import { useParams } from "react-router-dom";
import { useGetEventQuery } from "../../services/eventsApi";
import CommentsBlock from "../../Components/commentsBlock/CommentsBlock";
import transformDate from "../../utils/transformDate";
import { contentMaker } from "../../utils/contentMaker";

import "./singleEventPage.sass";

const SingleEventPage: React.FC = () => {
    const { eventId } = useParams();
    console.log(eventId);
    const { data: eventData, isLoading } = useGetEventQuery(eventId as string);
    if (isLoading) {
        return;
    }
    const {
        title,
        subtitle,
        title_image,
        restaurantName,
        dateStart,
        dateFinish,
        createdAt,
        content,
    } = eventData!;
    const [start, finish, added] = transformDate([dateStart, dateFinish, createdAt]);
    const displayContent = contentMaker(content);
    return (
        <>
            <div className="page-wrapper">
                <div className="event-info__container">
                    <div className="event-info__title">{title}</div>
                    <div className="event-info__subtitle">{subtitle}</div>
                    <div className="event-info__wrapper">
                        <div className="event-info__label">Где проходит: </div>
                        <div className="event-info__text">Ресторан {restaurantName}</div>
                        <div className="event-info__label">Когда проходит:</div>
                        <div className="event-info__text">
                            C <span>{start}</span> до <span>{finish}</span>
                        </div>
                    </div>

                    <div className="event-info__image">
                        <img src={title_image} alt="event" />
                    </div>
                    <div className="event-info__content">
                        {displayContent}

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
