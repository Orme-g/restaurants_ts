import React, { useEffect, useState } from "react";

import { Button } from "@mui/material";
import LongCard from "../longCard/LongCard";

import "./restaurantSelectionRenderList.sass";

import type { IRestaurant } from "../../types/restaurantsTypes";

interface ISelectionListProps {
    restaurantsData: IRestaurant[];
    displayItems: number;
}

const RestaurantSelectionRenderList: React.FC<ISelectionListProps> = ({
    restaurantsData,
    displayItems = 3,
}) => {
    const [renderData, setRenderData] = useState<IRestaurant[]>(() =>
        restaurantsData.slice(0, displayItems)
    );
    const [startWith, setStartWith] = useState<number>(displayItems);
    const [endWith, setEndWith] = useState<number>(displayItems * 2);
    const [buttonStatus, setButtonStatus] = useState<boolean>(true);
    const [buttonText, setButtonText] = useState<string>("Пока это всё");
    const totalRestaurants = restaurantsData.length;
    useEffect(() => {
        if (renderData.length <= totalRestaurants) {
            setButtonStatus(false);
            setButtonText("Загрузить ещё");
        }
        // eslint-disable-next-line
    }, []);
    useEffect(() => {
        if (renderData.length >= totalRestaurants) {
            setButtonStatus((buttonStatus) => !buttonStatus);
            setButtonText("Пока это всё");
        }
        // eslint-disable-next-line
    }, [renderData]);

    function renderMore() {
        setStartWith((startWith) => startWith + displayItems);
        setEndWith((endWith) => endWith + displayItems);
        setRenderData([...renderData, ...restaurantsData.slice(startWith, endWith)]);
    }

    const renderList = renderData.map(({ _id, createdAt, ...data }) => {
        return (
            <LongCard
                type="restaurant"
                data={data}
                link={`/restaurant/${_id}`}
                key={_id}
                date={null}
            />
        );
    });
    return (
        <>
            {renderList}
            <Button
                variant="outlined"
                onClick={() => renderMore()}
                disabled={buttonStatus}
                size="large"
                color="success"
                style={{ width: 200, alignSelf: "center" }}
            >
                {buttonText}
            </Button>
        </>
    );
};

export default RestaurantSelectionRenderList;
