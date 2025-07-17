import React, { useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { useAppDispatch, useAppSelector } from "../../types/store";
import { useGetRestaurantByIdQuery } from "../../services/restaurantsApi";
import { useParams } from "react-router-dom";

import "./singleRestaurantPage.scss";
import Slider from "../../Components/sliderImages/Slider";
import RestSideInfo from "../../Components/restSideInfo/RestSideInfo";
import RestaurantsTabs from "../../Components/restaurantsTabs/RestaurantsTabs";
import { PageSkeleton } from "../../Components/skeletons/Skeletons";
import ResourceNotFound from "../ResourceNotFound";
import {
    useGetFavoriteRestaurantsListQuery,
    useHandleFavouriteRestaurantsMutation,
} from "../../services/userApi";
import { callSnackbar } from "../../reducers/interactive";

const SingleRestaurantPage: React.FC = () => {
    console.log("renderRest");
    const dispatch = useAppDispatch();
    const { restId } = useParams<string>();
    const _id = useAppSelector((state) => state.interactive.userData?._id);
    const isAuth = !!_id;
    const {
        data: restaurantData,
        isLoading,
        isError,
    } = useGetRestaurantByIdQuery(restId!, {
        skip: !restId,
    });
    let userId: string | null = null;
    if (_id) {
        userId = _id;
    }
    const { data: favoriteRestaurants } = useGetFavoriteRestaurantsListQuery(undefined, {
        skip: !userId,
    });
    const [handleFavourite] = useHandleFavouriteRestaurantsMutation();
    let isFavourite: boolean = false;

    const handleFavouriteButton = useCallback(
        (name: string) => {
            const type: "remove" | "add" = isFavourite ? "remove" : "add";
            handleFavourite({ restId, type, name })
                .unwrap()
                .then(({ message, type }) => {
                    dispatch(callSnackbar({ text: message, type: type }));
                });

            // eslint-disable-next-line
        },
        [favoriteRestaurants]
    );

    if (isLoading || !restId) {
        return <PageSkeleton />;
    }
    if (isError || !restaurantData) {
        return <ResourceNotFound />;
    }
    if (favoriteRestaurants) {
        let favouriteRestaurantsIds = favoriteRestaurants.map((item) => item[1]);
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
                    isRegistered={isAuth}
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
