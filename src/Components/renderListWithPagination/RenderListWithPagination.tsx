import React, { useEffect, useState } from "react";

import { Button } from "@mui/material";

interface IRenderList {
    displayItems?: number;
    list: JSX.Element[];
}

const RenderListWithPagination: React.FC<IRenderList> = ({ displayItems = 3, list }) => {
    const [renderData, setRenderData] = useState(() => list.slice(0, displayItems));
    const [startWith, setStartWith] = useState<number>(displayItems);
    const [endWith, setEndWith] = useState<number>(displayItems * 2);
    const [buttonStatus, setButtonStatus] = useState<boolean>(true);
    const [buttonText, setButtonText] = useState<string>("Пока это всё");
    const totalRestaurants = list.length;
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
        setRenderData([...renderData, ...list.slice(startWith, endWith)]);
    }
    return (
        <>
            {renderData}
            {renderData.length === 0 ? null : (
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
            )}
        </>
    );
};

export default RenderListWithPagination;
