import React from "react";

import "./blogProfileData.sass";

import { calculateStatus } from "../../utils/calculateExperience";

import type { IBlogData } from "../../types/userData";

interface IBlogProfileData {
    blogData: IBlogData;
}

const BlogProfileData: React.FC<IBlogProfileData> = ({ blogData }) => {
    const { blogerName, aboutMe, blogCity, blogPostsCount, blogerRating, blogAvatar } = blogData;
    const status = calculateStatus(blogerRating);
    return (
        <>
            <div className="profile-page__blog-subtitle">Вы ведёте блог</div>
            <div className="profile-page__userdata_item">
                <img src={blogAvatar} alt="blogAvatar" />
            </div>
            <div className="profile-page__userdata_item">
                <div className="profile-page__data-field">В блоге вас знают как:</div>
                <div className="profile-page__data-value">{blogerName}</div>
            </div>
            <div className="profile-page__userdata_item">
                <div className="profile-page__data-field">Что вы написали о себе:</div>
                <div className="profile-page__data-value">{aboutMe}</div>
            </div>
            <div className="profile-page__userdata_item">
                <div className="profile-page__data-field">Город:</div>
                <div className="profile-page__data-value">{blogCity}</div>
            </div>
            <div className="profile-page__userdata_item">
                <div className="profile-page__data-field">Всего постов:</div>
                <div className="profile-page__data-value">{blogPostsCount}</div>
            </div>
            <div className="profile-page__userdata_item">
                <div className="profile-page__data-field">Ваш рейтинг:</div>
                <div className="profile-page__data-value">{blogerRating}</div>
            </div>
            <div className="profile-page__userdata_item">
                <div className="profile-page__data-field">Ваш статус:</div>
                <div className="profile-page__data-value">{status}</div>
            </div>
        </>
    );
};

export default BlogProfileData;
