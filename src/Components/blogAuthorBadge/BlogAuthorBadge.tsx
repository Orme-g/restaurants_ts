import React from "react";

import "./blogAuthorBadge.sass";

// import avatar from "../../assets/blogers/bloger3.JPG";

interface IAuthorBadge {
    avatar: string;
}

const BlogAuthorBadge: React.FC<IAuthorBadge> = ({ avatar }) => {
    return (
        <div className="author-card__container">
            <div className="author-card__avatar">
                <img src={avatar} alt="avatar" />
            </div>
            <div className="author-card__name-occupation">
                <div className="author-card__name">Екатерина К.</div>
                <div className="author-card__status">Топ блогер</div>
            </div>
        </div>
    );
};

export default BlogAuthorBadge;
