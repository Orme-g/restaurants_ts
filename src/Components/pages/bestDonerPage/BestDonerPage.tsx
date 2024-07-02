import React from "react";
import { useParams } from "react-router-dom";
import { useGetSingleDonerRestaurantQuery } from "../../../services/donersApi";

import CommentsBlock from "../../commentsBlock/CommentsBlock";
import { Rating } from "@mui/material";
import Slider from "../../sliderImages/Slider";
import { PageSkeleton } from "../../skeletons/Skeletons";

import "./bestDonerPage.sass";

const BestDonerPage = () => {
    const { donerId } = useParams();
    const { data: singleDonerData, isLoading } = useGetSingleDonerRestaurantQuery(
        donerId as string
    );

    if (isLoading) {
        return <PageSkeleton />;
    }

    if (singleDonerData) {
        const {
            name,
            rating,
            title_image,
            description,
            bloquote,
            author,
            images,
            subtitle,
            createdAt,
            _id,
        } = singleDonerData;

        const date = new Date(createdAt).toLocaleString("ru", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
        return (
            <>
                <section className="doner-topic__container">
                    <div className="doner-topic__title">
                        {" "}
                        {name}
                        <div className="doner-topic__subtitle"> {subtitle} </div>
                    </div>
                    <div className="doner-topic__image">
                        <img src={title_image} alt="doner" />
                        {/* <img src={pic} alt="doner" /> */}
                    </div>
                    <div className="doner-topic__content">
                        <blockquote>{bloquote}</blockquote>
                        <p>{description}</p>
                    </div>
                    <div className="doner-topic__slider">
                        <Slider images={images} />
                    </div>
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
                <CommentsBlock currentTopicId={_id} />
            </>
        );
    }
};

export default BestDonerPage;
