import React, { useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../types/store";

import { fetchRestaurantData, fetchRestaurantReviews } from "../../reducers/restaurants";
import { useParams } from "react-router-dom";

import "./singleRestaurantPage.scss";
import Slider from "../../Components/sliderImages/Slider";
import RestSideInfo from "../../Components/restSideInfo/RestSideInfo";
import RestaurantsTabs from "../../Components/restaurantsTabs/RestaurantsTabs";
import { PageSkeleton } from "../../Components/skeletons/Skeletons";
import Page404 from "../Page404";
import ResourceNotFound from "../ResourceNotFound";
import {
    useGetUserDataQuery,
    useHandleFavouriteRestaurantsMutation,
} from "../../services/apiSlice";
import { callSnackbar } from "../../reducers/interactive";
import useLocalStorage from "../../hooks/useLocalStorage";
import type { IUserData } from "../../types/userData";

const SingleRestaurantPage: React.FC = () => {
    useEffect(() => {
        if (restId) {
            dispatch(fetchRestaurantData(restId));
            dispatch(fetchRestaurantReviews(restId));
        }
        // eslint-disable-next-line
    }, []);
    const { restaurantData, pageLoading } = useAppSelector((state) => state.restaurants);
    const { passAuth } = useAppSelector((state) => state.interactive);
    const dispatch = useAppDispatch();
    const { restId } = useParams<string>();
    const { getUserData } = useLocalStorage();
    const userData: IUserData = getUserData();
    let userId: string | null = null;
    if (userData) {
        userId = userData._id;
    }
    const { data } = useGetUserDataQuery(userId as string, {
        skip: !!!userId,
    });
    const [handleFavourite] = useHandleFavouriteRestaurantsMutation();
    let isFavourite: "idle" | boolean = "idle";
    const handleFavouriteButton = useCallback(() => {
        const type = isFavourite ? "remove" : "add";
        handleFavourite({ restId, userId, type })
            .unwrap()
            .then(({ message, type }) => dispatch(callSnackbar({ text: message, type: type })));

        // eslint-disable-next-line
    }, [data]);

    if (pageLoading === "loading" || !restId) {
        return <PageSkeleton />;
    }
    if (!restaurantData) {
        return <ResourceNotFound />;
    }
    // console.log(restaurantData);
    if (data) {
        const { favouriteRestaurants } = data;
        isFavourite = favouriteRestaurants.includes(restId) ? true : false;
    }
    const { name, images, description, coordinates } = restaurantData;
    return (
        <>
            <Helmet>
                <title>Ресторан {name}</title>
            </Helmet>
            <div className="restaurant-info__container">
                <div className="restaurant-info__name">{name}</div>
                <div className="restaurant-info__slider">
                    <Slider images={images} />
                </div>
                <RestSideInfo
                    data={restaurantData}
                    isFavourite={isFavourite}
                    favouriteHandler={handleFavouriteButton}
                    isRegistered={passAuth}
                />
            </div>
            <RestaurantsTabs
                description={description}
                restId={restId}
                restaurantName={name}
                coordinates={coordinates}
            />
        </>
    );
};

export default SingleRestaurantPage;
