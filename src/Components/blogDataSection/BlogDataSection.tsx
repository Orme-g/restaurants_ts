import React from "react";

import StartBlogForm from "../../Components/forms/startBlogForm/StartBlogForm";
import BlogProfileData from "../../Components/blogProfileData/BlogProfileData";

import "./blogDataSection.scss";

import type { IBlogData, IUserData } from "../../types/userData";

interface IBlogDataSection {
    userData: IUserData;
}

const BlogDataSection: React.FC<IBlogDataSection> = ({ userData }) => {
    const { bloger, blogData } = userData;
    return (
        <section className="blog-data">
            <div className="blog-data__title">Блог</div>
            {bloger && blogData ? <BlogProfileData blogData={blogData} /> : <StartBlogForm />}
        </section>
    );
};

export default BlogDataSection;
