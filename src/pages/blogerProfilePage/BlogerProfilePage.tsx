import React from "react";
import { Helmet } from "react-helmet-async";

import { useParams } from "react-router-dom";

import BlogPostCardLong from "../../Components/blogPostCardLong/BlogPostCardLong";
import BlogPostCard from "../../Components/blogPostCard/BlogPostCard";
import RenderListWithPagination from "../../Components/renderListWithPagination/RenderListWithPagination";

import { useGetUserBlogPublicDataQuery } from "../../services/userApi";
import { useGetUserPostsQuery } from "../../services/blogApi";

import { BlogerProfilePageSkeleton } from "../../Components/skeletons/Skeletons";
import Page404 from "../Page404";

import { calculateStatus } from "../../utils/calculateExperience";

import "./blogerProfilePage.scss";

const BlogerProfilePage: React.FC = () => {
    const { userId } = useParams();
    const { data: blogData, isLoading } = useGetUserBlogPublicDataQuery(userId!);
    const { currentData: posts, isLoading: isPostsLoading } = useGetUserPostsQuery(userId!);

    if (isLoading || isPostsLoading) {
        return <BlogerProfilePageSkeleton />;
    }
    if (!blogData || !posts) {
        return <Page404 />;
    }

    let allPostsList;
    let displTop4Posts;

    const { blogerName, blogAvatar, blogCity, blogPostsCount, blogerRating, aboutMe } = blogData;
    const status = calculateStatus(blogerRating);
    if (posts) {
        let postsCopy = [...posts];
        postsCopy.sort((a, b) => b.likes - a.likes);
        let top4Posts = postsCopy.slice(0, 4);
        displTop4Posts = top4Posts.map((item) => {
            const { _id } = item;
            return <BlogPostCard key={_id} data={item} />;
        });

        allPostsList = posts.map((post) => {
            const { _id } = post;
            return <BlogPostCardLong key={_id} data={post} />;
        });
    }

    return (
        <>
            <Helmet>
                <title>Профиль {blogerName}</title>
            </Helmet>
            <div className="bloger-profile__container">
                <div className="bloger-profile__info">
                    <div className="bloger-profile__info_image">
                        <img src={blogAvatar} alt="bloger" />
                    </div>
                    <div className="bloger-profile__info_container">
                        <div className="bloger-profile__info_name">
                            {blogerName}, <span>{blogCity}</span>
                        </div>
                        <div className="bloger-profile__info_status">
                            <div className="status-title">{status}</div>
                        </div>
                        <div className="bloger-profile__info_posts-count">
                            Cтатей: {blogPostsCount}
                        </div>
                        <div className="bloger-profile__info_about-me">{aboutMe}</div>
                    </div>
                </div>
                <div className="bloger-profile__top-posts">
                    <div className="bloger-profile__top-posts_title">Самые популярные посты:</div>
                    <div className="bloger-profile__top-posts_list">{displTop4Posts}</div>
                </div>
                <div className="bloger-profile__all-posts">
                    <div className="bloger-profile__all-posts_title">Все посты:</div>
                    <div className="bloger-profile__all-posts_list">
                        <RenderListWithPagination list={allPostsList!} displayItems={5} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogerProfilePage;
