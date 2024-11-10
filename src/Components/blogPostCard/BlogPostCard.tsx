import React from "react";

import ChatIcon from "@mui/icons-material/Chat";
import FavoriteIcon from "@mui/icons-material/Favorite";

import BlogAuthorBadge from "../blogAuthorBadge/BlogAuthorBadge";

import "./blogPostCard.sass";

import bloger from "../../assets/blogers/bloger2.jpg";

import type { IBlogPost } from "../../types/blogPost";
interface IBlogPostCard {
    data: IBlogPost;
}

const BlogPostCard: React.FC<IBlogPostCard> = ({ data }) => {
    const { title_image, title, short_description, likes, themes, userId } = data;
    const displayThemes = themes.join(", ");
    return (
        <div className="blog-item-card__container">
            <div className="blog-item-card__author">
                <BlogAuthorBadge userId={userId} />
            </div>
            <div className="blog-item-card__image">
                <img src={title_image} alt="title" />
            </div>
            <div className="blog-item-card__title">{title}</div>
            <div className="blog-item-card__description">{short_description}</div>
            <div className="blog-item-card__data">
                <div className="blog-item-card__data_likes">
                    <FavoriteIcon />
                    <span>{likes}</span>
                </div>
                <div className="blog-item-card__data_comments">
                    <ChatIcon />
                    <span>126</span>
                </div>
                <div className="blog-item-card__data_themes">
                    <span>{displayThemes}</span>{" "}
                </div>
            </div>
        </div>
    );
};

export default BlogPostCard;
