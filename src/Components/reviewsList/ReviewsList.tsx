import React from "react";
import { useAppSelector } from "../../types/store";

import ReviewItem from "../reviewItem/ReviewItem";
import Spinner from "../svg/Spinner";

const ReviewsList: React.FC = () => {
    const { restaurantReviews } = useAppSelector((state) => state.restaurants);

    if (!restaurantReviews) {
        return <Spinner />;
    }

    const reviews = restaurantReviews.map((reviewData) => {
        const { _id } = reviewData;
        return <ReviewItem key={_id} data={reviewData} />;
    });

    return <>{reviews.length === 0 ? <div>Отзывов пока нет.</div> : reviews}</>;
};

export default ReviewsList;
