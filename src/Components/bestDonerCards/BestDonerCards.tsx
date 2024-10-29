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
        const { _id } = card;
        return <LongCard type="doner" data={card} key={_id} />;
    }

    return <>{donerCards}</>;
};

export default BestDonerCards;
