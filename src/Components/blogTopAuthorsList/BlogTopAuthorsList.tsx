import React from "react";

import { useGetTopAuthorsIdsQuery } from "../../services/blogApi";

import BlogAuthorBadge from "../blogAuthorBadge/BlogAuthorBadge";

const BlogTopAuthorsList: React.FC = () => {
    let renderList;
    const { data: topAuthorsIds, isLoading } = useGetTopAuthorsIdsQuery();
    if (isLoading) {
        return;
    }
    if (topAuthorsIds) {
        renderList = topAuthorsIds.map((id) => {
            return <BlogAuthorBadge key={id} userId={id} />;
        });
    }

    return <>{renderList}</>;
};

export default BlogTopAuthorsList;
