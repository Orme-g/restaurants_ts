import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@mui/material";
import Select, { MultiValue, SingleValue } from "react-select";
import { cousines } from "../../data/cousines";
import type { Cousine } from "../../data/cousines";

import { useFindRestaurantMutation } from "../../services/restaurantsApi";
import SelectSubway from "../../Components/selectSubway/SelectSubway";
import LongCard from "../../Components/longCard/LongCard";
import RenderListWithPagination from "../../Components/renderListWithPagination/RenderListWithPagination";
import "./restaurantSelectionPage.scss";
import type { IFindRestaurantCriterias, IRestaurant } from "../../types/restaurantsTypes";

interface ISelectOption {
    label: Cousine;
    value: Cousine;
}

type TSortTypes = "expensive" | "cheaper";
interface ISortOption {
    label: "дороже" | "дешевле";
    value: TSortTypes;
}

const RestaurantSelectionPage: React.FC = () => {
    const [subway, setSubway] = useState<string>("");
    const [cousine, setCousine] = useState<Cousine[]>([]);
    const [sortBy, setSortBy] = useState<TSortTypes>("cheaper");
    const [findRestaurant, { data, isLoading, isUninitialized, isSuccess }] =
        useFindRestaurantMutation();
    const cousinesOptions = cousines.map((cousine) => ({
        value: cousine,
        label: cousine,
    }));
    const sortOptions: ISortOption[] = [
        { label: "дороже", value: "expensive" },
        { label: "дешевле", value: "cheaper" },
    ];
    const findRest = () => {
        const criterias: IFindRestaurantCriterias = { subway, cousine, sortBy };
        findRestaurant(criterias);
    };
    const handleSelectSubway = (selected: string) => {
        setSubway(selected);
    };
    const handleSelectCousine = (selected: MultiValue<ISelectOption>): void => {
        const values = selected.map((item) => item.value);
        setCousine(values);
    };
    const handleSelectSortBy = (selected: SingleValue<ISortOption>) => {
        if (selected) {
            setSortBy(selected.value);
        }
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
                        <div>Я около метро:</div>
                        <SelectSubway handleChange={handleSelectSubway} multiple={false} />
                    </div>
                    <div className="find-restaurant__search_wrapper">
                        <div>Предпочтительная кухня:</div>
                        <Select
                            options={cousinesOptions}
                            onChange={handleSelectCousine}
                            isMulti
                            placeholder="Выберите кухню..."
                            styles={{
                                control: (styles) => ({
                                    ...styles,
                                    border: "none",
                                    minWidth: "200px",
                                    marginLeft: "7px",
                                    boxShadow: "none",
                                    backgroundColor: "inherit",
                                }),
                                multiValue: (styles) => ({
                                    ...styles,
                                    backgroundColor: "#f5f5f5",
                                }),
                                multiValueLabel: (styles) => ({
                                    ...styles,
                                    fontSize: "18px",
                                }),
                                multiValueRemove: (styles) => ({
                                    ...styles,
                                    ":hover": {
                                        backgroundColor: "#a7a7a7",
                                    },
                                }),
                                dropdownIndicator: (styles) => ({
                                    ...styles,
                                    color: "#616161",
                                    ":hover": {
                                        color: "#2f2f2f",
                                    },
                                }),
                                clearIndicator: (styles) => ({
                                    ...styles,
                                    color: "#616161",
                                    ":hover": {
                                        color: "#2f2f2f",
                                    },
                                }),
                            }}
                        />
                    </div>
                    <div className="find-restaurant__search_wrapper">
                        <div>Сначала показать рестораны:</div>
                        <Select
                            defaultValue={sortOptions[1]}
                            options={sortOptions}
                            onChange={handleSelectSortBy}
                            styles={{
                                control: (styles) => ({
                                    ...styles,
                                    border: "none",
                                    minWidth: "150px",
                                    marginLeft: "7px",
                                    boxShadow: "none",
                                    backgroundColor: "inherit",
                                }),
                                dropdownIndicator: (styles) => ({
                                    ...styles,
                                    color: "#616161",
                                    ":hover": {
                                        color: "#2f2f2f",
                                    },
                                }),
                                clearIndicator: (styles) => ({
                                    ...styles,
                                    color: "#616161",
                                    ":hover": {
                                        color: "#2f2f2f",
                                    },
                                }),
                            }}
                        />
                    </div>
                </div>
                <div className="find-restaurant__search-button">
                    <Button color="success" size="large" variant="contained" onClick={findRest}>
                        Поиск
                    </Button>
                </div>

                <div className="find-restaurant__results_title">Результаты поиска:</div>
                <div className="find-restaurant__results_output">{searchResults}</div>
            </section>
        </>
    );
};

export default RestaurantSelectionPage;
