import React, { useState, memo } from "react";
import { useAppSelector } from "../../types/store";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import ReviewsList from "../reviewsList/ReviewsList";
import ReviewForm from "../forms/reviewForm/ReviewForm";
import EventsList from "../eventsList/EventsList";
import "./restaurantsTabs.sass";

interface IRestaurantsTabsProps {
    description: string;
    restId: string;
}

const RestaurantsTabs: React.FC<IRestaurantsTabsProps> = memo(({ description, restId }) => {
    const [activeTab, setActiveTab] = useState("3");
    const checkAuth = useAppSelector((state) => state.interactive.passAuth);
    const handleChange = (event: any, newActiveTab: string) => {
        setActiveTab(newActiveTab);
    };
    console.log("render tabs");

    const unAuth = <div className="unAuthorised">Войдите, чтобы оставить отзыв</div>;

    return (
        <div className="restaurants-tabs__container">
            <Box sx={{ width: "100%" }}>
                <TabContext value={activeTab}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList onChange={handleChange} aria-label="Restaurant Tabs">
                            <Tab label="О Ресторане" value="1" />
                            <Tab label="Меню" value="2" />
                            <Tab label="Отзывы" value="3" />
                            <Tab label="События" value="4" />
                            <Tab label="Карта" value="5" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <div className="restaurants-tabs__description">{description}</div>
                    </TabPanel>
                    <TabPanel value="2">
                        <div className="restaurants-tabs__menu">
                            <a href="https://ginza.ru/assets/files/20230913/27e44e1ecbae742adbd450c1b16df731.pdf">
                                Перейти для просмотра меню
                            </a>
                        </div>
                    </TabPanel>
                    <TabPanel value="3">
                        <div className="restaurants-tabs__feedback">
                            {checkAuth ? <ReviewForm restId={restId} /> : unAuth}
                            <ReviewsList />
                        </div>
                    </TabPanel>
                    <TabPanel value="4">
                        <div className="restaurants-tabs__events">
                            <EventsList />
                        </div>
                    </TabPanel>
                    <TabPanel value="5"></TabPanel>
                </TabContext>
            </Box>
        </div>
    );
});

export default RestaurantsTabs;
