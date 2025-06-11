import React, { useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../types/store";

import { fetchRestaurantReviews } from "../../reducers/restaurants";
import { useGetRestaurantByIdQuery } from "../../services/apiSlice";
import { useParams } from "react-router-dom";

import "./singleRestaurantPage.scss";
import Slider from "../../Components/sliderImages/Slider";
import RestSideInfo from "../../Components/restSideInfo/RestSideInfo";
import RestaurantsTabs from "../../Components/restaurantsTabs/RestaurantsTabs";
import { PageSkeleton } from "../../Components/skeletons/Skeletons";
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
            // dispatch(fetchRestaurantData(restId));
            dispatch(fetchRestaurantReviews(restId));
        }
        // eslint-disable-next-line
    }, []);
    const { passAuth } = useAppSelector((state) => state.interactive);
    const dispatch = useAppDispatch();
    const { restId } = useParams<string>();
    const { getUserData } = useLocalStorage();
    const userData: IUserData = getUserData();
    const {
        data: restaurantData,
        isLoading,
        isError,
    } = useGetRestaurantByIdQuery(restId!, {
        skip: !restId,
    });
    let userId: string | null = null;
    if (userData) {
        userId = userData._id;
    }
    const { data } = useGetUserDataQuery(userId!, {
        skip: !userId,
    });
    const [handleFavourite] = useHandleFavouriteRestaurantsMutation();
    let isFavourite: boolean = false;

    const handleFavouriteButton = useCallback(
        (name: string) => {
            const type: "remove" | "add" = isFavourite ? "remove" : "add";
            handleFavourite({ restId, userId, type, name })
                .unwrap()
                .then(({ message, type }) => dispatch(callSnackbar({ text: message, type: type })));

            // eslint-disable-next-line
        },
        [data]
    );

    if (isLoading || !restId) {
        return <PageSkeleton />;
    }
    if (isError || !restaurantData) {
        return <ResourceNotFound />;
    }
    if (data) {
        const { favouriteRestaurants } = data;
        let favouriteRestaurantsIds = favouriteRestaurants.map((item) => item[1]);
        isFavourite = favouriteRestaurantsIds.includes(restId) ? true : false;
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
