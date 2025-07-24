import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material/";
import { useSearchRestaurantQuery } from "../../services/restaurantsApi";

import "./header.scss";

const Header: React.FC = () => {
    const [value, setValue] = useState("");
    const [display, setDisplay] = useState("show");
    const { currentData, isFetching } = useSearchRestaurantQuery(value.trim(), {
        skip: value === "",
    });
    let results = null;
    const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        setValue(e.target.value);
    };
    const handleFocus = () => {
        setDisplay("show");
    };
    const handleBlur = () => {
        setTimeout(() => {
            setDisplay("hide");
        }, 200);
    };

    if (isFetching) {
        results = <li className="search-results__list_item no-results">Поиск... </li>;
    }

    if (currentData) {
        if (currentData.length > 0) {
            results = currentData.map((item) => (
                <Link
                    className="search-results__list_item"
                    to={`/restaurant/${item._id}`}
                    key={item._id}
                >
                    {item.name}
                </Link>
            ));
        }
        if (currentData.length === 0) {
            results = (
                <li className="search-results__list_item no-results">Ничего не найдено... </li>
            );
        }
    }
    if (!value) {
        results = null;
    }

    return (
        <div className="main-page-header">
            <div className="search-bar">
                <TextField
                    fullWidth
                    value={value}
                    label="Найти ресторан..."
                    onChange={(e) => handleChange(e)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    sx={{
                        backgroundColor: "#fff",
                    }}
                />
                <ul className={`search-results__list ${display}`}>{results}</ul>
            </div>
        </div>
    );
};

export default Header;
