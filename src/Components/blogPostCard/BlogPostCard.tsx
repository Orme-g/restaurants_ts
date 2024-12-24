import React from "react";

import { Link } from "react-router-dom";
import ChatIcon from "@mui/icons-material/Chat";
import FavoriteIcon from "@mui/icons-material/Favorite";

import BlogAuthorBadge from "../blogAuthorBadge/BlogAuthorBadge";

import "./blogPostCard.sass";

import type { IBlogPost } from "../../types/blogPost";
interface IBlogPostCard {
    data: IBlogPost;
}

const BlogPostCard: React.FC<IBlogPostCard> = ({ data }) => {
    const { title_image, title, subtitle, likes, themes, userId, _id } = data;
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
            <div className="blog-item-card__description">{subtitle}</div>
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
            <Link to={`/blog/blog-post/${_id}`}>
                <div className="blog-item-card__link">Читать...</div>
            </Link>
        </div>
    );
};

export default BlogPostCard;
