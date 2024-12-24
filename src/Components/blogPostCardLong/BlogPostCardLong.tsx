import React from "react";

import { Link } from "react-router-dom";
import ChatIcon from "@mui/icons-material/Chat";
import FavoriteIcon from "@mui/icons-material/Favorite";

import "./blogPostCardLong.sass";

import type { IBlogPost } from "../../types/blogPost";

interface IBlogPostCardLong {
    data: IBlogPost;
}

const BlogPostCardLong: React.FC<IBlogPostCardLong> = ({ data }) => {
    const { _id, title, subtitle, likes, themes } = data;
    const displayThemes = themes.join(", ");
    return (
        <Link to={`/blog/blog-post/${_id}`}>
            <div className="blog-card-long__container">
                <div className="blog-card-long__info">
                    <div className="blog-card-long__info_title">{title}</div>
                    <div className="blog-card-long__info_description">{subtitle}</div>
                    <div className="blog-card-long__footer">
                        <div className="blog-card-long__footer_likes-count">
                            <FavoriteIcon />
                            <span>{likes}</span>
                        </div>
                        <div className="blog-card-long__footer_comments-count">
                            <ChatIcon />
                            <span>126</span>
                        </div>
                        <div className="blog-card-long__footer_themes">
                            <span>{displayThemes}</span>{" "}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default BlogPostCardLong;
