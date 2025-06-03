import React, { useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import AddRestaurantForm from "../../Components/forms/addRestaurantForm/AddRestaurantForm";
import AddDonerArticleForm from "../../Components/forms/addDonerArticleForm/AddDonerArticleForm";

import "./adminPage.scss";

const AdminPage = () => {
    const [displayAddReastaurant, setDisplayAddRestaurant] = useState(false);
    const [displayAddArticle, setDisplayAddArticle] = useState(false);

    const toggleDisplayRestaurantForm = () => {
        setDisplayAddRestaurant((state) => !state);
    };
    const toggleDisplayArticleForm = () => {
        setDisplayAddArticle((state) => !state);
    };
    return (
        <section className="admin-panel">
            <h1 className="admin-panel__main-title">Управление сайтом.</h1>
            <ul className="admin-panel__actions-list">
                <li
                    className="admin-panel__actions-list_item"
                    onClick={() => setDisplayAddRestaurant((state) => !state)}
                >
                    Добавить ресторан <CreateIcon className="admin-panel__actions-list_icon" />
                </li>
                <AddRestaurantForm
                    displayState={displayAddReastaurant}
                    toggleDisplay={toggleDisplayRestaurantForm}
                />
                <li
                    className="admin-panel__actions-list_item"
                    onClick={() => setDisplayAddArticle((state) => !state)}
                >
                    Добавить статью <CreateIcon className="admin-panel__actions-list_icon" />
                </li>
                <AddDonerArticleForm
                    displayState={displayAddArticle}
                    toggleDisplay={toggleDisplayArticleForm}
                />
            </ul>
        </section>
    );
};

export default AdminPage;
