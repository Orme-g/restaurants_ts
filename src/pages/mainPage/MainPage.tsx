import React from "react";
import Header from "../../Components/header/Header";
import RestaurantsGallery from "../../Components/restaurantsGallery/RestaurantsGallery";
import RestaurantsSelections from "../../Components/restaurantsSelections/RestaurantsSelections";

const MainPage = () => {
    return (
        <>
            <Header />
            <RestaurantsGallery />
            <RestaurantsSelections />
        </>
    );
};

export default MainPage;
