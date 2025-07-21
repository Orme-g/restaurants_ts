import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FormControl, MenuItem, SelectChangeEvent, Select, Button } from "@mui/material";
import { cousines } from "../../data/cousines";
import type { Cousine } from "../../data/cousines";

import { useFindRestaurantMutation } from "../../services/restaurantsApi";
import SelectSubway from "../../Components/selectSubway/SelectSubway";
import LongCard from "../../Components/longCard/LongCard";
import RenderListWithPagination from "../../Components/renderListWithPagination/RenderListWithPagination";
import "./restaurantSelectionPage.scss";
import type { IFindRestaurantCriterias, IRestaurant } from "../../types/restaurantsTypes";

const RestaurantSelectionPage: React.FC = () => {
    const [subway, setSubway] = useState<string>("");
    const [cousine, setCousine] = useState<Cousine[]>([]);
    const [sortBy, setSortBy] = useState<"cheaper" | "expensive">("cheaper");
    const [findRestaurant, { data, isLoading, isUninitialized, isSuccess }] =
        useFindRestaurantMutation();
    const findRest = () => {
        const criterias: IFindRestaurantCriterias = { subway, cousine, sortBy };
        findRestaurant(criterias);
    };
    const handleSelectSubway = (selected: string) => {
        setSubway(selected);
    };
    const handleSelectCousine = (event: SelectChangeEvent<string[]>): void => {
        const {
            target: { value },
        } = event;
        const selected = typeof value === "string" ? value.split(",") : value;
        const validSelected = selected.filter((v): v is Cousine => cousines.includes(v as Cousine));
        setCousine(validSelected);
    };
    const handleSelectSortBy = (event: SelectChangeEvent) => {
        setSortBy(event.target.value as "cheaper" | "expensive");
    };
    let searchResults;
    if (isUninitialized)
        searchResults = <span>Нажмите на "Поиск" для отображения результатов</span>;
    if (isLoading) {
        searchResults = <span>Идет поиск...</span>;
    }
    if (isSuccess && !data) {
        searchResults = <span>Поиск не дал результатов...</span>;
    }
    if (data) {
        const renderList = data.map((data: IRestaurant) => {
            const { _id } = data;
            return <LongCard type="restaurant" data={data} key={_id} />;
        });
        searchResults = <RenderListWithPagination displayItems={3} list={renderList} />;
    }
    return (
        <>
            <Helmet>
                <title>Подобрать ресторан.</title>
            </Helmet>
            <section className="find-restaurant__container">
                <h1 className="find-restaurant__title">Подобрать ресторан</h1>
                <h3 className="find-restaurant__subtitle">
                    Подобрать ресторан рядом с вами или для будущей поездки.
                </h3>
                <div className="find-restaurant__search">
                    <div className="find-restaurant__search_wrapper">
                        <div>Я около метро</div>
                        <SelectSubway handleChange={handleSelectSubway} multiple={false} />
                    </div>
                    <div className="find-restaurant__search_wrapper">
                        <div>предпочтительная кухня</div>
                        <FormControl
                            variant="standard"
                            sx={{
                                minWidth: 100,
                                maxWidth: 300,
                                marginLeft: "15px",
                                marginRight: "15px",
                            }}
                        >
                            <Select
                                style={{ fontSize: "20px", fontWeight: 300 }}
                                value={cousine}
                                multiple
                                onChange={handleSelectCousine}
                            >
                                {cousines.map((cousine) => (
                                    <MenuItem key={cousine} value={cousine}>
                                        {cousine}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="find-restaurant__search_wrapper">
                        <div>сначала показать рестораны</div>

                        <FormControl
                            variant="standard"
                            sx={{ minWidth: "100px", marginLeft: "15px", marginRight: "15px" }}
                        >
                            <Select
                                style={{ fontSize: "20px", fontWeight: 300 }}
                                value={sortBy}
                                onChange={handleSelectSortBy}
                            >
                                <MenuItem value={"cheaper"}>Дешевле</MenuItem>
                                <MenuItem value={"expensive"}>Дороже</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <Button
                    color="success"
                    size="large"
                    variant="contained"
                    onClick={findRest}
                    sx={{ marginTop: "50px" }}
                >
                    Поиск
                </Button>
                <div className="find-restaurant__results_title">Результаты поиска:</div>
                <div className="find-restaurant__results_output">{searchResults}</div>
            </section>
        </>
    );
};

export default RestaurantSelectionPage;
