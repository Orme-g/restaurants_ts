import React from "react";

import { useGetSortedPostsQuery } from "../../services/blogApi";
import BlogPostCard from "../blogPostCard/BlogPostCard";
import { BlogPostCardSkeleton } from "../skeletons/Skeletons";

interface IBlogList {
    type: "top" | "last";
}
const BlogCardsSelection: React.FC<IBlogList> = ({ type }) => {
    let renderList;
    const { data: postsData, isLoading } = useGetSortedPostsQuery(type);
    if (isLoading) {
        return (
            <>
                <BlogPostCardSkeleton />
                <BlogPostCardSkeleton />
                <BlogPostCardSkeleton />
                <BlogPostCardSkeleton />
            </>
        );
    }
    if (postsData) {
        renderList = postsData.map((item) => {
            const { _id: id } = item;
            return <BlogPostCard key={id} data={item} />;
        });
    }

    return <>{renderList}</>;
};

export default BlogCardsSelection;
