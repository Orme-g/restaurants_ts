import React from "react";

import { Link } from "react-router-dom";
import { useGetDataForBadgeQuery } from "../../services/blogApi";

import { AuthorBadgeSkeleton } from "../skeletons/Skeletons";
import { calculateStatus } from "../../utils/calculateExperience";
// import avatar from "../../assets/blogers/bloger3.JPG";
import "./blogAuthorBadge.sass";
interface IAuthorBadge {
    userId: string;
}

const BlogAuthorBadge: React.FC<IAuthorBadge> = ({ userId }) => {
    const { data: blogData, isLoading } = useGetDataForBadgeQuery(userId);
    if (isLoading) {
        return <AuthorBadgeSkeleton />;
    }
    const { blogAvatar, blogerName, blogerRating } = blogData!;
    const displayStatus = calculateStatus(blogerRating);

    return (
        <Link to={`/blog/bloger-profile/${userId}`}>
            <div className="author-card__container">
                <div className="author-card__avatar">
                    <img src={blogAvatar} alt="avatar" />
                </div>
                <div className="author-card__name-status">
                    <div className="author-card__name">{blogerName}</div>
                    <div className="author-card__status">{displayStatus}</div>
                </div>
            </div>
        </Link>
    );
};

export default BlogAuthorBadge;
