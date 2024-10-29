import React from "react";

import { useParams } from "react-router-dom";

import { useGetRestaurantEventsQuery } from "../../services/eventsApi";
import LongCardSmall from "../longCardSmall/LongCardSmall";
import RenderListWithPagination from "../renderListWithPagination/RenderListWithPagination";
import "./eventsList.sass";

import type { IEvent } from "../../types/eventTypes";

const EventsList: React.FC = () => {
    const { restId } = useParams();
    const { data: eventsList, isLoading } = useGetRestaurantEventsQuery(restId as string);
    let cardsList: JSX.Element[] = [];
    if (isLoading) {
        return;
    }
    if (eventsList) {
        cardsList = eventsList.map((data: IEvent) => {
            const { _id } = data;
            return <LongCardSmall data={data} key={_id} />;
        });
    }
    return (
        <div className="events-list__container">
            <RenderListWithPagination list={cardsList} displayItems={2} />
        </div>
    );
};

export default EventsList;
