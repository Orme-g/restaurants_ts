import React from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../types/store";

import { fetchRestaurantData, fetchRestaurantReviews } from "../../../reducers/restaurants";
import { useParams } from "react-router-dom";

import "./singleRestaurantPage.sass";
import Slider from "../../sliderImages/Slider";
import RestSideInfo from "../../restSideInfo/RestSideInfo";
import RestaurantsTabs from "../../restaurantsTabs/RestaurantsTabs";
import { PageSkeleton } from "../../skeletons/Skeletons";

const SingleRestaurantPage: React.FC = () => {
    const { restaurantData, pageLoading } = useAppSelector((state) => state.restaurants);
    const dispatch = useAppDispatch();
    const { restId } = useParams();

    useEffect(() => {
        if (restId) {
            dispatch(fetchRestaurantData(restId));
            dispatch(fetchRestaurantReviews(restId));
        }

        // eslint-disable-next-line
    }, []);

    if (pageLoading === "loading" || restaurantData === null) {
        return <PageSkeleton />;
    }

    const { images, description } = restaurantData;

    return (
        <>
            <div className="restaurant-info__container">
                <div className="restaurant-info__slider">
                    <Slider images={images} />
                </div>
                <RestSideInfo data={restaurantData} />
            </div>
            <RestaurantsTabs description={description} restId={restId} />
        </>
    );
};

export default SingleRestaurantPage;
