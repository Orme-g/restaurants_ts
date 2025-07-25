import React from "react";

import { useParams } from "react-router-dom";
import { useAppSelector } from "../../types/store";
import { useGetRestaurantReviewsQuery } from "../../services/restaurantsApi";
import ReviewForm from "../forms/reviewForm/ReviewForm";
import ReviewItem from "../reviewItem/ReviewItem";
import Spinner from "../svg/Spinner";

import "./reviewsBlock.scss";

const ReviewsBlock: React.FC = () => {
    const { restId } = useParams<string>();
    const isAuth = useAppSelector((state) => state.interactive.isAuth);
    const { data: restaurantReviews } = useGetRestaurantReviewsQuery(restId!, {
        skip: !restId,
    });
    const unAuth = <div className="unAuthorised">Войдите, чтобы оставить отзыв</div>;
    if (!restId || !restaurantReviews) {
        return <Spinner />;
    }
    const reviews = restaurantReviews.map((review) => {
        const { _id } = review;
        return <ReviewItem key={_id} data={review} />;
    });
    return (
        <div className="reviews-block__container">
            {isAuth ? <ReviewForm restId={restId} /> : unAuth}
            {reviews}
            {reviews.length === 0 ? <div>Отзывов пока нет.</div> : reviews}
        </div>
    );
};

export default ReviewsBlock;
