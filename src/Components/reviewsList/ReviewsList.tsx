import React from "react";
import { useGetRestaurantReviewsQuery } from "../../services/restaurantsApi";
import ReviewItem from "../reviewItem/ReviewItem";
import Spinner from "../svg/Spinner";

interface IReviewsList {
    restId: string;
}

const ReviewsList: React.FC<IReviewsList> = ({ restId }) => {
    const { data: restaurantReviews, isFetching } = useGetRestaurantReviewsQuery(restId!, {
        skip: !restId,
    });

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
