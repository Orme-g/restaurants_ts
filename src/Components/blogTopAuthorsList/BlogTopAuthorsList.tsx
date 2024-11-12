import React from "react";

import { useGetTopAuthorsIdsQuery } from "../../services/blogApi";

import BlogAuthorBadge from "../blogAuthorBadge/BlogAuthorBadge";
import { AuthorBadgeSkeleton } from "../skeletons/Skeletons";

const BlogTopAuthorsList: React.FC = () => {
    let renderList;
    const { data: topAuthorsIds, isLoading } = useGetTopAuthorsIdsQuery();
    if (isLoading) {
        return (
            <>
                <AuthorBadgeSkeleton />
                <AuthorBadgeSkeleton />
            </>
        );
    }
    if (topAuthorsIds) {
        renderList = topAuthorsIds.map((id) => {
            return <BlogAuthorBadge key={id} userId={id} />;
        });
    }

    return <>{renderList}</>;
};

export default BlogTopAuthorsList;
