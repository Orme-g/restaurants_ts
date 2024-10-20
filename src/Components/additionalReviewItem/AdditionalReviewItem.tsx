import React, { useState } from "react";
import { Rating } from "@mui/material";

import tranfsormDate from "../../utils/transformDate";

import "./additionalReviewItem.sass";

interface IAdditionalReviewProps {
    additionalReviewData: {
        like: string;
        dislike: string;
        rating: number;
        added: Date;
    };
}

const AdditionalReviewItem: React.FC<IAdditionalReviewProps> = ({ additionalReviewData }) => {
    const [displayExtraReview, setDisplayExtraReview] = useState("hide-with-animation");
    let interactiveText =
        displayExtraReview === "hide-with-animation" ? "Отзыв дополнен" : "Скрыть отзыв";

    function toggleDisplExtrtaReview() {
        if (displayExtraReview === "hide-with-animation") {
            setDisplayExtraReview("show-with-animation");
        } else {
            setDisplayExtraReview("hide-with-animation");
        }
    }
    const { like, dislike, rating, added } = additionalReviewData;
    const date = tranfsormDate(added);
    return (
        <>
            <div className="toggle-display-extra-review" onClick={toggleDisplExtrtaReview}>
                <div className="toggle-display-extra-review_text">{interactiveText}</div>
            </div>
            <div className={`feedback-card__additional_container ${displayExtraReview}`}>
                <div className="feedback-card__additional_body">
                    <Rating
                        className="feedback-card__additional_body_rating"
                        name="rating"
                        value={rating}
                        precision={0.5}
                        readOnly
                    />
                    <div className="feedback-card__additional_body_title">Понравилось:</div>
                    <div className="feedback-card__additional_body_content">{like}</div>
                    <div className="feedback-card__additional_body_title">Не понравилось:</div>
                    <div className="feedback-card__additional_body_content">{dislike}</div>
                    <div className="feedback-card__additional_body_title">Оценка:</div>
                    <div className="feedback-card__additional_body_content">{rating}</div>
                    <div className="feedback-card__additional_body_added">
                        Отзыв дополнен: {date}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdditionalReviewItem;
