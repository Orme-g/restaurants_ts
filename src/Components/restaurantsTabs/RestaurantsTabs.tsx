import React, { useState, memo } from "react";
import { useAppSelector } from "../../types/store";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { YMaps, Map, Placemark, GeolocationControl } from "@pbe/react-yandex-maps";

import ReviewsList from "../reviewsList/ReviewsList";
import ReviewForm from "../forms/reviewForm/ReviewForm";
import EventsList from "../eventsList/EventsList";
import ModalWindow from "../modals/modalWindow/ModalWindow";
import PostConstructor from "../postConstructor/PostConstructor";

import "./restaurantsTabs.scss";

interface IRestaurantsTabsProps {
    description: string;
    restId: string;
    restaurantName: string;
    coordinates: string;
}

const RestaurantsTabs: React.FC<IRestaurantsTabsProps> = memo(
    ({ description, restId, restaurantName, coordinates }) => {
        const [activeTab, setActiveTab] = useState("3");
        const [displayModal, setDisplayModal] = useState(false);
        const isAuth = useAppSelector((state) => state.interactive.isAuth);
        const handleChange = (event: React.SyntheticEvent, newActiveTab: string) => {
            setActiveTab(newActiveTab);
        };
        const coordinatesToUse = coordinates.split(",").map((item) => +item.trim());
        function modalController(open: boolean) {
            setDisplayModal(open);
        }
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
                                {isAuth ? <ReviewForm restId={restId} /> : unAuth}
                                <ReviewsList />
                            </div>
                        </TabPanel>
                        <TabPanel value="4">
                            <div className="restaurants-tabs__events">
                                <button
                                    className="restaurants-tabs__add-event_btn"
                                    onClick={() => modalController(true)}
                                >
                                    Добавить событие
                                </button>
                                <EventsList />
                            </div>
                        </TabPanel>
                        <TabPanel value="5">
                            <div id="map" className="restaurants-tabs__map">
                                <YMaps>
                                    <Map
                                        width={"100%"}
                                        height={"100%"}
                                        defaultState={{
                                            center: coordinatesToUse,

                                            zoom: 15,
                                            controls: ["zoomControl", "fullscreenControl"],
                                        }}
                                        modules={[
                                            "control.ZoomControl",
                                            "control.FullscreenControl",
                                        ]}
                                    >
                                        <Placemark geometry={coordinatesToUse} />
                                    </Map>
                                </YMaps>
                            </div>
                        </TabPanel>
                    </TabContext>
                </Box>
                {displayModal ? (
                    <ModalWindow modalController={modalController}>
                        <PostConstructor
                            modalController={modalController}
                            type="event"
                            restaurantData={{ restaurantName, restId }}
                        />
                    </ModalWindow>
                ) : null}
            </div>
        );
    }
);

export default RestaurantsTabs;
