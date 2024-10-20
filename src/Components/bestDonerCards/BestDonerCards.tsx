import React from "react";
import { useGetDonersListQuery } from "../../services/donersApi";

import LongCard from "../longCard/LongCard";
import { LongCardsSkeleton } from "../skeletons/Skeletons";

import type { IDonerRestaurant } from "../../types/donersTypes";
import "./bestDonerCards.sass";

const BestDonerCards: React.FC = () => {
    const { data: allDonersData, isLoading, isError } = useGetDonersListQuery(null);

    if (isLoading || isError) {
        return <LongCardsSkeleton />;
    }

    const donerCards = allDonersData
        ? allDonersData.map((item) => {
              return createDonerCard(item);
          })
        : null;

    function createDonerCard(card: IDonerRestaurant) {
        const { _id, createdAt } = card;
        const date = new Date(createdAt).toLocaleString("ru", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
        return (
            <LongCard type="doner" link={`/best-doner/${_id}`} data={card} key={_id} date={date} />
        );
    }

    return <>{donerCards}</>;
};

export default BestDonerCards;
