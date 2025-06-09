import React from "react";
import { Helmet } from "react-helmet-async";

import { useParams } from "react-router-dom";
import ChatIcon from "@mui/icons-material/Chat";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../types/store";
import { updateUserData } from "../../reducers/interactive";
import { useGetBlogPostQuery } from "../../services/blogApi";
import transformDate from "../../utils/transformDate";
import { contentMaker } from "../../utils/contentMaker";
import Page404 from "../Page404";

import "./blogPostPage.scss";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useUpdateLikesOrCommentsCountMutation } from "../../services/blogApi";
import CommentsBlock from "../../Components/commentsBlock/CommentsBlock";
import BlogAuthorBadge from "../../Components/blogAuthorBadge/BlogAuthorBadge";
import { PageSkeleton } from "../../Components/skeletons/Skeletons";
import { callSnackbar } from "../../reducers/interactive";

const BlogPostPage: React.FC = () => {
    const { postId } = useParams();
    const { data: postData, isLoading } = useGetBlogPostQuery(postId!);
    const [sendData] = useUpdateLikesOrCommentsCountMutation();
    const { getUserId } = useLocalStorage();
    const dispatch = useAppDispatch();
    const ratedPosts = useAppSelector((state) => state.interactive.userData?.ratedBlogPosts);
    const isAuth = useAppSelector((state) => state.interactive.passAuth);
    const isRated = ratedPosts?.includes(postId as string);
    let displayContent;
    const handleLike = () => {
        if (isAuth) {
            const userId = getUserId();
            sendData({
                postId,
                field: "like",
                userId,
            })
                .unwrap()
                .then(() => dispatch(updateUserData(userId)));
        } else {
            dispatch(callSnackbar({ text: "Войдите или зарегистрируйтесь", type: "info" }));
        }
    };
    if (isLoading) {
        return <PageSkeleton />;
    }
    if (!postData) {
        return <Page404 />;
    }
    const { userId, title, subtitle, title_image, createdAt, themes, likes, content } = postData!;

    if (content) {
        displayContent = contentMaker(content);
    }
    const date = transformDate(createdAt);
    const displayThemes = themes.join(", ");

    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <div className="blog-post-page__container">
                <div className="blog-post-page__author">
                    <BlogAuthorBadge userId={userId} />
                </div>
                <div className="blog-post-page__title">{title}</div>
                <div className="blog-post-page__subtitle">{subtitle}</div>
                {title_image ? (
                    <div className="blog-post-page__title-image">
                        <img src={title_image} alt="main" />
                    </div>
                ) : null}

                <div className="blog-post-page__content">{displayContent}</div>

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

                <Button
                    disabled={isRated}
                    onClick={handleLike}
                    className="blog-post-page__like-button"
                    variant="contained"
                >
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
