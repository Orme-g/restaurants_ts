import React from "react";
import { useParams } from "react-router-dom";
import { useGetSingleDonerRestaurantQuery } from "../../services/donersApi";

import CommentsBlock from "../../Components/commentsBlock/CommentsBlock";
import { Rating } from "@mui/material";
import Slider from "../../Components/sliderImages/Slider";
import { PageSkeleton } from "../../Components/skeletons/Skeletons";
import tranfsormDate from "../../utils/transformDate";

import pic from "../../assets/event.JPG";
import "./singleDonerPage.sass";

const SingleDonerPage = () => {
    const { donerId } = useParams<string>();
    const { data: singleDonerData, isLoading } = useGetSingleDonerRestaurantQuery(
        donerId as string
    );
    if (isLoading) {
        return <PageSkeleton />;
    }

    if (singleDonerData) {
        const { title, rating, title_image, author, subtitle, createdAt, _id, content } =
            singleDonerData;
        const displayContent = content.map((item) => {
            if ("text" in item) {
                return <p>{item.text}</p>;
            } else if ("bloquote" in item) {
                return <blockquote>{item.bloquote}</blockquote>;
            } else if ("slider" in item) {
                return (
                    <div className="doner-topic__slider">
                        <Slider images={item.slider as string[]} />
                    </div>
                );
            } else {
                return null;
            }
        });

        const date = tranfsormDate(createdAt);
        return (
            <>
                <div className="page-wrapper">
                    <section className="doner-topic__container">
                        <div className="doner-topic__title">
                            {" "}
                            {title}
                            <div className="doner-topic__subtitle"> {subtitle} </div>
                        </div>
                        <div className="doner-topic__image">
                            {/* <img src={title_image} alt="doner" /> */}
                            <img src={pic} alt="doner" />
                        </div>
                        <div className="doner-topic__content">{displayContent}</div>
                        <div className="doner-topic__rating">
                            Наша оценка:{" "}
                            <Rating
                                value={rating}
                                readOnly
                                precision={0.1}
                                sx={{
                                    marginLeft: "15px",
                                    transform: "translateY(5px)",
                                }}
                                size="large"
                            />
                        </div>
                        <div className="doner-topic__author">
                            Автор статьи: <span>{author}</span>
                        </div>
                        <div className="doner-topic__published">
                            Опубликовано: <span>{date}</span>
                        </div>
                    </section>
                    <div className="doner-topic__comments">
                        <CommentsBlock currentTopicId={_id} />
                    </div>
                </div>
            </>
        );
    }
};

export default SingleDonerPage;
