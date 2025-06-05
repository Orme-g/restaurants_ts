import React from "react";

import StartBlogForm from "../../Components/forms/startBlogForm/StartBlogForm";
import BlogProfileData from "../../Components/blogProfileData/BlogProfileData";

import "./blogDataSection.scss";

import type { IBlogData, IUserData } from "../../types/userData";

interface IBlogDataSection {
    userData: IUserData;
}

const BlogDataSection: React.FC<IBlogDataSection> = ({ userData }) => {
    const { _id, bloger, blogData } = userData;
    return (
        <section>
            <div className="profile-page__blogdata">
                <div className="profile-page__blog-title">Блог</div>
                {bloger && blogData ? (
                    <BlogProfileData blogData={blogData} />
                ) : (
                    <StartBlogForm userId={_id} />
                )}
            </div>
        </section>
    );
};

export default BlogDataSection;
