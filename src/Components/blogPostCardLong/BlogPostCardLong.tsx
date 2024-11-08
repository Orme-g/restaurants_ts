import React from "react";

import { Link } from "react-router-dom";
import ChatIcon from "@mui/icons-material/Chat";
import FavoriteIcon from "@mui/icons-material/Favorite";

import "./blogPostCardLong.sass";

const BlogPostCardLong: React.FC = () => {
    return (
        <Link to={`/blog-post/222`}>
            <div className="blog-card-long__container">
                <div className="blog-card-long__info">
                    <div className="blog-card-long__info_author">Екатерина П.</div>
                    <div className="blog-card-long__info_title">Пость о котах</div>
                    <div className="blog-card-long__info_description">
                        Почему-то обсуждается только людская еда, а котики?? Почему-то обсуждается
                        только людская еда, а котики??Почему-то обсуждается только людская еда, а
                        котики?? Почему-то обсуждается только людская еда, а котики??Почему-то
                        обсуждается только людская еда, а котики??
                    </div>
                    <div className="blog-card-long__footer">
                        <div className="blog-card-long__footer_likes-count">
                            <FavoriteIcon />
                            <span>43</span>
                        </div>
                        <div className="blog-card-long__footer_comments-count">
                            <ChatIcon />
                            <span>126</span>
                        </div>
                        <div className="blog-card-long__footer_themes">
                            <span>Еда, Напитки</span>{" "}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default BlogPostCardLong;
