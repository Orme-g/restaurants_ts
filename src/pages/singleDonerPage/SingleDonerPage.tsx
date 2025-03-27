import React from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useGetSingleDonerRestaurantQuery } from "../../services/donersApi";

import CommentsBlock from "../../Components/commentsBlock/CommentsBlock";
import { Rating } from "@mui/material";
import { PageSkeleton } from "../../Components/skeletons/Skeletons";
import tranfsormDate from "../../utils/transformDate";
import { contentMaker } from "../../utils/contentMaker";

import pic from "../../assets/event.JPG";
import "./singleDonerPage.sass";

const SingleDonerPage: React.FC = () => {
    const { donerId } = useParams<string>();
    const { data: singleDonerData, isLoading } = useGetSingleDonerRestaurantQuery(
        donerId as string
    );
    if (isLoading) {
        return <PageSkeleton />;
    }

    if (singleDonerData) {
        const { title, rating, author, subtitle, createdAt, _id, content } = singleDonerData;
        const displayContent = contentMaker(content);
        const date = tranfsormDate(createdAt);
        return (
            <>
                <Helmet>
                    <title>{title}</title>
                </Helmet>
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
