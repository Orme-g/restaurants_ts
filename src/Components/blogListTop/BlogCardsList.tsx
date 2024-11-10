import React from "react";

import { useGetSortedPostsQuery } from "../../services/blogApi";
import BlogPostCard from "../blogPostCard/BlogPostCard";

interface IBlogList {
    type: "top" | "last";
}
const BlogCardsList: React.FC<IBlogList> = ({ type }) => {
    let renderList;
    const { data: postsData, isLoading } = useGetSortedPostsQuery(type);
    if (isLoading) {
        return;
    }
    if (!postsData) {
        return;
    }
    if (postsData) {
        renderList = postsData.map((item) => {
            const { _id: id } = item;
            return <BlogPostCard key={id} data={item} />;
        });
    }

    return <>{renderList}</>;
};

export default BlogCardsList;
