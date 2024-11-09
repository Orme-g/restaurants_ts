import React from "react";

import ChatIcon from "@mui/icons-material/Chat";
import FavoriteIcon from "@mui/icons-material/Favorite";

import BlogAuthorBadge from "../blogAuthorBadge/BlogAuthorBadge";

import "./blogPostCard.sass";

import pic from "../../assets/event.JPG";
import bloger from "../../assets/blogers/bloger2.jpg";

const BlogPostCard: React.FC = () => {
    return (
        <div className="blog-item-card__container">
            <div className="blog-item-card__author">
                <BlogAuthorBadge avatar={bloger} userId="672ea035fbe6099f7c51ee08" />
            </div>
            <div className="blog-item-card__image">
                <img src={pic} alt="title" />
            </div>
            <div className="blog-item-card__title">Почему бы не поесть?</div>
            <div className="blog-item-card__description">
                Вот мы задались вопросом, почему бы не поесть, если можно поесть??
            </div>
            <div className="blog-item-card__data">
                <div className="blog-item-card__data_likes">
                    <FavoriteIcon />
                    <span>43</span>
                </div>
                <div className="blog-item-card__data_comments">
                    <ChatIcon />
                    <span>126</span>
                </div>
                <div className="blog-item-card__data_themes">
                    <span>Еда, Напитки</span>{" "}
                </div>
            </div>
        </div>
    );
};

export default BlogPostCard;
