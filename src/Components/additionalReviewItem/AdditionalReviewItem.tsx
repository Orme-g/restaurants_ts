import React, { useState } from "react";
import { Rating } from "@mui/material";

import tranfsormDate from "../../utils/transformDate";

import "./additionalReviewItem.scss";

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
                <div className="toggle-display-extra-review_text">
                    <span>{interactiveText}</span>
                </div>
            </div>
            <div className={`review-item__additional_container ${displayExtraReview}`}>
                <Rating
                    sx={{
                        position: "absolute",
                        top: "20px",
                        right: "30px",
                        "@media(max-width:480px)": {
                            fontSize: "16px",
                            top: "15px",
                            right: "15px",
                        },
                    }}
                    name="rating"
                    value={rating}
                    precision={0.5}
                    readOnly
                />
                <div className="review-item__additional_body">
                    <div className="review-item__additional_body_title">Понравилось:</div>
                    <div className="review-item__additional_body_content">{like}</div>
                    <div className="review-item__additional_body_title">Не понравилось:</div>
                    <div className="review-item__additional_body_content">{dislike}</div>
                    <div className="review-item__additional_body_title">Оценка:</div>
                    <div className="review-item__additional_body_content">{rating}</div>
                    <div className="review-item__additional_body_added">Отзыв дополнен: {date}</div>
                </div>
            </div>
        </>
    );
};

export default AdditionalReviewItem;
