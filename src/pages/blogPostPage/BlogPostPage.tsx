import React from "react";

import { useParams } from "react-router-dom";
import ChatIcon from "@mui/icons-material/Chat";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Button } from "@mui/material";

import { useGetBlogPostQuery } from "../../services/blogApi";
import transformDate from "../../utils/transformDate";
import Page404 from "../Page404";

import "./blogPostPage.sass";

import CommentsBlock from "../../Components/commentsBlock/CommentsBlock";
import BlogAuthorBadge from "../../Components/blogAuthorBadge/BlogAuthorBadge";
import { PageSkeleton } from "../../Components/skeletons/Skeletons";

const BlogPostPage: React.FC = () => {
    const { postId } = useParams();
    const { data: postData, isLoading } = useGetBlogPostQuery(postId!);
    if (isLoading) {
        return <PageSkeleton />;
    }
    if (!postData) {
        <Page404 />;
    }
    const {
        userId,
        title,
        subtitle,
        title_image,
        bloquote,
        description,
        createdAt,
        themes,
        likes,
    } = postData!;

    const date = transformDate(createdAt);
    const displayThemes = themes.join(", ");

    return (
        <>
            <div className="blog-post-page__container">
                <div className="blog-post-page__author">
                    <BlogAuthorBadge userId={userId} />
                </div>
                <div className="blog-post-page__title">{title}</div>
                <div className="blog-post-page__subtitle">{subtitle}</div>
                <div className="blog-post-page__image">
                    <img src={title_image} alt="main" />
                </div>
                <div className="blog-post-page__blockquote">{bloquote}</div>
                <div className="blog-post-page__text">{description}</div>
                <div className="blog-post-page__date">{date}</div>
                <div className="blog-post-page__feedback">
                    <div className="blog-post-page__feedback_likes">
                        <FavoriteIcon />
                        <span>{likes}</span>
                    </div>
                    <div className="blog-post-page__feedback_comments">
                        <ChatIcon />
                        <span>126</span>
                    </div>
                    <div className="blog-post-page__feedback_themes">
                        <span>{displayThemes}</span>{" "}
                    </div>
                </div>
                <Button className="blog-post-page__like-button" variant="contained">
                    Понравилась!
                </Button>

                <div className="blog-post-page__comments">
                    <CommentsBlock currentTopicId={postId!} />
                </div>
            </div>
        </>
    );
};

export default BlogPostPage;
