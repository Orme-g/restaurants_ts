import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
    FormControl,
    ListSubheader,
    MenuItem,
    ListItemIcon,
    ListItemText,
    SelectChangeEvent,
    Select,
    Button,
} from "@mui/material";
import { cousines } from "../../data/cousines";

import { useFindRestaurantMutation } from "../../services/restaurantsApi";
import { subwaySpb } from "../../data/subwaysLists";
import LongCard from "../../Components/longCard/LongCard";
import RenderListWithPagination from "../../Components/renderListWithPagination/RenderListWithPagination";
import SubwayIcon from "../../Components/svg/subwayIcon";
import "./restaurantSelectionPage.scss";

import type { IFindRestaurantCriterias, IRestaurant } from "../../types/restaurantsTypes";

enum TSubwayColors {
    Red = "#D70138",
    Blue = "#0079CA",
    Green = "#019C47",
    Orange = "#EB7220",
    Purple = "#6D2781",
}

const RestaurantSelectionPage: React.FC = () => {
    const { line1, line2, line3, line4, line5 } = subwaySpb;
    const [subway, setSubway] = useState("");
    const [cousine, setCousine] = useState([]);
    const [sortBy, setSortBy] = useState<"cheaper" | "expensive">("cheaper");
    const [findRestaurant, { data, isLoading, isUninitialized, isSuccess }] =
        useFindRestaurantMutation();
    const findRest = () => {
        const criterias: IFindRestaurantCriterias = { subway, cousine, sortBy };
        findRestaurant(criterias)
            .unwrap()
            .then((response) => console.log(response));
    };
    const handleSelectSubway = (event: SelectChangeEvent) => {
        setSubway(event.target.value as string);
    };
    const handleSelectCousine = (event: any) => {
        const {
            target: { value },
        } = event;
        setCousine(typeof value === "string" ? value.split(",") : value);
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
                        <FormControl
                            variant="standard"
                            sx={{ minWidth: "100px", marginLeft: "15px", marginRight: "15px" }}
                        >
                            <Select
                                style={{ fontSize: "20px", fontWeight: 300 }}
                                id="select-subway"
                                value={subway}
                                onChange={handleSelectSubway}
                                renderValue={(selected) => selected}
                            >
                                <ListSubheader>Линия 1</ListSubheader>
                                {line1.map((station) => (
                                    <MenuItem value={station} key={station}>
                                        <ListItemIcon>
                                            <SubwayIcon color={TSubwayColors.Red} />
                                        </ListItemIcon>
                                        <ListItemText>{station}</ListItemText>
                                    </MenuItem>
                                ))}
                                <ListSubheader>Линия 2</ListSubheader>
                                {line2.map((station) => (
                                    <MenuItem value={station} key={station}>
                                        <ListItemIcon>
                                            <SubwayIcon color={TSubwayColors.Blue} />
                                        </ListItemIcon>
                                        <ListItemText>{station}</ListItemText>
                                    </MenuItem>
                                ))}
                                <ListSubheader>Линия 3</ListSubheader>
                                {line3.map((station) => (
                                    <MenuItem value={station} key={station}>
                                        <ListItemIcon>
                                            <SubwayIcon color={TSubwayColors.Green} />
                                        </ListItemIcon>
                                        <ListItemText>{station}</ListItemText>
                                    </MenuItem>
                                ))}{" "}
                                <ListSubheader>Линия 4</ListSubheader>
                                {line4.map((station) => (
                                    <MenuItem value={station} key={station}>
                                        <ListItemIcon>
                                            <SubwayIcon color={TSubwayColors.Orange} />
                                        </ListItemIcon>
                                        <ListItemText>{station}</ListItemText>
                                    </MenuItem>
                                ))}
                                <ListSubheader>Линия 5</ListSubheader>
                                {line5.map((station) => (
                                    <MenuItem value={station} key={station}>
                                        <ListItemIcon>
                                            <SubwayIcon color={TSubwayColors.Purple} />
                                        </ListItemIcon>
                                        <ListItemText>{station}</ListItemText>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
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
