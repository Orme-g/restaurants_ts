import React from "react";

import { Link } from "react-router-dom";

import "./blogAuthorBadge.sass";

// import avatar from "../../assets/blogers/bloger3.JPG";

interface IAuthorBadge {
    avatar: string;
    userId: string;
}

const BlogAuthorBadge: React.FC<IAuthorBadge> = ({ avatar, userId }) => {
    return (
        <Link to={`/bloger-profile/${userId}`}>
            <div className="author-card__container">
                <div className="author-card__avatar">
                    <img src={avatar} alt="avatar" />
                </div>
                <div className="author-card__name-occupation">
                    <div className="author-card__name">Екатерина К.</div>
                    <div className="author-card__status">Топ блогер</div>
                </div>
            </div>
        </Link>
    );
};

export default BlogAuthorBadge;
