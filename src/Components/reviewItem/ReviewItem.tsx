import React, { useState } from "react";
import { Rating, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { useGetUserDataQuery } from "../../services/userApi";
import { calculateExperience } from "../../utils/calculateExperience";
import { ReviewItemSkeleton } from "../skeletons/Skeletons";
import tranfsormDate from "../../utils/transformDate";
import AdditionalReviewItem from "../additionalReviewItem/AdditionalReviewItem";
import AdditionalReviewForm from "../forms/additionalReviewForm/AdditionalReviewForm";
import { useAppSelector } from "../../types/store";
import type { IReview } from "../../types/reviewsTypes";

import "./reviewItem.scss";

interface ReviewItemProps {
    data: IReview;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ data }) => {
    const [displayAdditionForm, setDisplayAdditionForm] = useState<boolean>(false);
    const {
        userId,
        rating,
        like,
        dislike,
        createdAt,
        additionalReview,
        _id: reviewId,
        restaurant,
    } = data;
    const toggleFormDispay = () => {
        setDisplayAdditionForm((displayAdditionForm) => !displayAdditionForm);
    };
    const date = tranfsormDate(createdAt);
    const { data: userData, isLoading } = useGetUserDataQuery(userId);
    const _id = useAppSelector((state) => state.interactive.userData?._id);
    const isMyReview = _id === userId;
    if (isLoading) {
        return <ReviewItemSkeleton />;
    }

    const { name, avatar, reviews } = userData!;
    return (
        <>
            <div className="feedback-card__container">
                <div className="feedback-card__header">
                    <div className="feedback-card__header_avatar">
                        <img src={avatar} alt={name} />
                    </div>
                    <div className="feedback-card__header_user">
                        <div className="feedback-card__header_username">{name}</div>
                        <div className="feedback-card__header_userstatus">
                            {calculateExperience(reviews)}
                        </div>
                    </div>
                    <div className="feedback-card__header_middle-space"></div>
                    <div className="feedback-card__header_rating-and-date">
                        <div className="feedback-card__header_rating">
                            <Rating name="rating" value={rating} precision={0.5} readOnly />
                        </div>
                        <div className="feedback-card__header_date">{date} </div>
                    </div>
                </div>
                <div className="feedback-card__body">
                    <div className="feedback-card__body_title">Понравилось:</div>
                    <div className="feedback-card__body_content">{like}</div>
                    <div className="feedback-card__body_title">Не понравилось:</div>
                    <div className="feedback-card__body_content">{dislike}</div>
                    <div className="feedback-card__body_title">Оценка:</div>
                    <div className="feedback-card__body_content">{rating}</div>
                    {isMyReview && !additionalReview ? (
                        <Button
                            size="small"
                            onClick={() => toggleFormDispay()}
                            sx={{
                                position: "absolute",
                                bottom: "15px",
                                right: "30px",
                                color: "#494949",
                            }}
                        >
                            Дополнить отзыв{" "}
                            <EditIcon
                                sx={{
                                    fontSize: "1.3rem",
                                    marginLeft: "5px",
                                    transform: "translateY(-3px)",
                                }}
                            />
                        </Button>
                    ) : null}
                </div>
            </div>
            {isMyReview && !additionalReview ? (
                <AdditionalReviewForm
                    reviewId={reviewId}
                    restId={restaurant}
                    displayStatus={displayAdditionForm}
                    toggleDisplayStatus={toggleFormDispay}
                />
            ) : null}

            {additionalReview ? (
                <AdditionalReviewItem additionalReviewData={additionalReview} />
            ) : null}
        </>
    );
};

export default ReviewItem;
