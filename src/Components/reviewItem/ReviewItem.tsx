import React, { useState } from "react";
import { Rating, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useGetUserPublicDataQuery } from "../../services/userApi";
import { calculateExperience } from "../../utils/calculateExperience";
import { ReviewItemSkeleton } from "../skeletons/Skeletons";
import tranfsormDate from "../../utils/transformDate";
import AdditionalReviewItem from "../additionalReviewItem/AdditionalReviewItem";
import AdditionalReviewForm from "../forms/additionalReviewForm/AdditionalReviewForm";
import { useAppSelector } from "../../types/store";
import type { IReview } from "../../types/restaurantsTypes";

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
    const { data: userData, isLoading } = useGetUserPublicDataQuery(userId);
    const _id = useAppSelector((state) => state.interactive.userData?._id);
    const isMyReview = _id === userId;
    if (isLoading) {
        return <ReviewItemSkeleton />;
    }
    if (!userData) {
        return;
    }
    const { name, avatar, reviews } = userData;
    return (
        <>
            <div className="review-item__container">
                <div className="review-item__header">
                    <div className="review-item__header_avatar">
                        <img src={avatar} alt={name} />
                    </div>
                    <div className="review-item__header_user">
                        <div className="review-item__header_username">{name}</div>
                        <div className="review-item__header_userstatus">
                            {calculateExperience(reviews)}
                        </div>
                    </div>
                    <div className="review-item__header_middle-space"></div>
                    <div className="review-item__header_rating-and-date">
                        <div className="review-item__header_rating">
                            <Rating
                                name="rating"
                                value={rating}
                                precision={0.5}
                                readOnly
                                sx={{
                                    marginRight: "20px",
                                    "@media (max-width: 480px)": {
                                        fontSize: "14px",
                                    },
                                }}
                            />
                        </div>
                        <div className="review-item__header_date">{date} </div>
                    </div>
                </div>
                <div className="review-item__body">
                    <div className="review-item__body_title">Понравилось:</div>
                    <div className="review-item__body_content">{like}</div>
                    <div className="review-item__body_title">Не понравилось:</div>
                    <div className="review-item__body_content">{dislike}</div>
                    <div className="review-item__body_title">Оценка:</div>
                    <div className="review-item__body_content">{rating}</div>
                    {isMyReview && !additionalReview ? (
                        <Button
                            size="small"
                            onClick={() => toggleFormDispay()}
                            sx={{
                                position: "absolute",
                                bottom: "15px",
                                right: "30px",
                                color: "#494949",
                                "@media (max-width: 480px)": {
                                    bottom: "5px",
                                    right: "10px",
                                },
                            }}
                        >
                            <span className="review-item__add-extra-review-button-text">
                                Дополнить отзыв
                            </span>
                            <EditIcon
                                sx={{
                                    fontSize: "1.3rem",
                                    marginLeft: "5px",
                                    transform: "translateY(-3px)",
                                    "@media (max-width: 480px)": {
                                        fontSize: "0.9rem",
                                    },
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
