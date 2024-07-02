import React, { useState } from "react";

import {
    FormControl,
    ListSubheader,
    MenuItem,
    ListItemIcon,
    ListItemText,
    SelectChangeEvent,
    Select,
} from "@mui/material";
import { cousines } from "../../../data/cousines";

// import SubwaySelectList from "../../../utils/subwayLists/subwaySelectList";
import { useFindRestaurantMutation } from "../../../services/apiSlice";
import { subwaySpb } from "../../../data/subwaysLists";
import SubwayIcon from "../../svg/subwayIcon";
import RestaurantCardSmall from "../../restaurantCardSmall/RestaurantCardSmall";
import "./findRestaurant.sass";

import type { IFindRestaurantCriterias, IRestaurant } from "../../../types/restaurantsTypes";

enum TSubwayColors {
    Red = "#D70138",
    Blue = "#0079CA",
    Green = "#019C47",
    Orange = "#EB7220",
    Purple = "#6D2781",
}

const FindRestaurant: React.FC = () => {
    const { line1, line2, line3, line4, line5 } = subwaySpb;
    const criterias: IFindRestaurantCriterias = {
        subway: "",
        cousine: [""],
        sortBy: "cheaper",
    };
    const [subway, setSubway] = useState("");
    const [cousine, setCousine] = useState([]);
    const [sortBy, setSortBy] = useState<"cheaper" | "expensive">("cheaper");
    const [findRestaurant, { data, isLoading, isError }] = useFindRestaurantMutation();
    console.log(data);
    const findRest = () => {
        criterias.subway = subway;
        criterias.cousine = cousine;
        criterias.sortBy = sortBy;
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
    return (
        <section className="find-restaurant__container">
            <div className="find-restaurant__title">Подобрать ресторан</div>
            <div className="find-restaurant__subtitle">
                Подобрать ресторан рядом с вами или для будущей поездки.
            </div>
            <div className="find-restaurant__search">
                Я около метро
                <FormControl variant="standard" sx={{ minWidth: 120 }}>
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
                предпочтительная кухня
                <FormControl variant="standard" sx={{ minWidth: 200, maxWidth: 300 }}>
                    <Select
                        style={{ fontSize: "20px", fontWeight: 300 }}
                        value={cousine}
                        multiple
                        onChange={handleSelectCousine}
                        // input={
                        //     <OutlinedInput
                        //         label="Кухня"
                        //         {...register("cousine", {
                        //             required: "Обязательное поле",
                        //         })}
                        //         error={!!errors.cousine}
                        //     />
                        // }
                    >
                        {cousines.map((cousine) => (
                            <MenuItem key={cousine} value={cousine}>
                                {cousine}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                сначала рестораны
                <FormControl variant="standard" sx={{ width: 150 }}>
                    <Select
                        style={{ fontSize: "20px", fontWeight: 300 }}
                        value={sortBy}
                        onChange={handleSelectSortBy}
                        // input={
                        //     <OutlinedInput
                        //         label="Город"
                        //         {...register("city", {
                        //             required: "Обязательное поле",
                        //         })}
                        //         error={!!errors.city}
                        //     />
                        // }
                    >
                        <MenuItem value={"cheaper"}>Дешевле</MenuItem>
                        <MenuItem value={"expensive"}>Дороже</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <button onClick={() => findRest()}>Check</button>
            <div className="find-restaurant__results">
                {/* {data ? <RestaurantCardSmall restData={data} /> : null} */}
                {data
                    ? data.map((item: IRestaurant) => <RestaurantCardSmall restData={item} />)
                    : null}
            </div>
        </section>
    );
};

export default FindRestaurant;
