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

import { subwaySpb } from "../../../data/subwaysLists";
import SubwayIcon from "../../svg/subwayIcon";
import "./findRestaurant.sass";

enum TSubwayColors {
    Red = "#D70138",
    Blue = "#0079CA",
    Green = "#019C47",
    Orange = "#EB7220",
    Purple = "#6D2781",
}

const FindRestaurant: React.FC = () => {
    const { line1, line2, line3, line4, line5 } = subwaySpb;
    const [subway, setSubway] = useState("");
    const [cousine, setCousine] = useState([]);
    const [sortBy, setSortBy] = useState("");
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
        setSortBy(event.target.value as string);
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
                        id="cousine-select"
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
                        id="city-select"
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
        </section>
    );
};

export default FindRestaurant;
