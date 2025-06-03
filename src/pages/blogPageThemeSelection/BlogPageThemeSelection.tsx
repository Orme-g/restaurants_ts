import React from "react";

import { useParams } from "react-router-dom";
import { useGetPostsByThemeQuery } from "../../services/blogApi";
import BlogPostCard from "../../Components/blogPostCard/BlogPostCard";
import { CardsSkeleton } from "../../Components/skeletons/Skeletons";

import "./blogPageThemeSelection.scss";

const BlogPageThemeSelection: React.FC = () => {
    const { theme } = useParams<string>();
    const { data: posts, isLoading } = useGetPostsByThemeQuery(theme!);
    let renderList;
    if (isLoading) {
        return <CardsSkeleton />;
    }
    if (posts) {
        renderList = posts.map((post) => {
            const { _id } = post;
            return <BlogPostCard key={_id} data={post} />;
        });
    }

    return (
        <div className="blog-page-selection">
            <div className="blog-page-selection__title">Все посты на тему: {theme}</div>
            <div className="blog-page-selection__list">{renderList}</div>
        </div>
    );
};

export default BlogPageThemeSelection;
