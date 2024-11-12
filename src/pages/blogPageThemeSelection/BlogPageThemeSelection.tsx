import React from "react";

import { useParams } from "react-router-dom";
import { useGetPostsByThemeQuery } from "../../services/blogApi";
import RenderListWithPagination from "../../Components/renderListWithPagination/RenderListWithPagination";
import BlogPostCard from "../../Components/blogPostCard/BlogPostCard";

import "./blogPageThemeSelection.sass";

const BlogPageThemeSelection: React.FC = () => {
    const { theme } = useParams();
    const { data: posts, isLoading } = useGetPostsByThemeQuery(theme!);
    let renderList;
    if (isLoading) {
        return;
    }
    // console.log(posts);
    if (posts) {
        renderList = posts.map((post) => {
            const { _id } = post;
            return <BlogPostCard key={_id} data={post} />;
        });
    }

    return (
        <div className="blog-page-selection">
            <div className="blog-page-selection__title">Все посты на тему: {theme}</div>
            <div className="blog-page-selection__list">
                <RenderListWithPagination list={renderList!} />
                {/* {renderList} */}
            </div>
        </div>
    );
};

export default BlogPageThemeSelection;
