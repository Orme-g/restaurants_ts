import React from "react";

import { useParams } from "react-router-dom";

import BlogPostCard from "../../Components/blogPostCard/BlogPostCard";
import BlogPostCardLong from "../../Components/blogPostCardLong/BlogPostCardLong";

import { useGetUserDataQuery } from "../../services/apiSlice";

import { BlogerProfilePageSkeleton } from "../../Components/skeletons/Skeletons";
import Page404 from "../Page404";

import { calculateStatus } from "../../utils/calculateExperience";

import "./blogerProfilePage.sass";

// import status from "../../assets/status1.PNG";

const BlogerProfilePage: React.FC = () => {
    const { userId } = useParams();
    console.log(userId);

    const { data: userData, isLoading } = useGetUserDataQuery(userId!);
    if (isLoading) {
        return <BlogerProfilePageSkeleton />;
    }
    console.log(userData);
    if (!userData) {
        return <Page404 />;
    }

    const { blogerName, blogAvatar, blogCity, blogPostsCount, blogPosts, blogerRating, aboutMe } =
        userData?.blogData!;
    const status = calculateStatus(blogerRating);

    return (
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
                        {/* <div className="status-image">
                            <img src={status} alt="status" />
                        </div> */}
                    </div>
                    <div className="bloger-profile__info_posts-count">Cтатей: {blogPostsCount}</div>
                    <div className="bloger-profile__info_about-me">{aboutMe}</div>
                </div>
            </div>
            <div className="bloger-profile__top-posts">
                <div className="bloger-profile__top-posts_title">Самые популярные посты:</div>
                <div className="bloger-profile__top-posts_list">
                    <div className="bloger-profile__top-posts_card">{/* <BlogPostCard /> */}</div>
                    <div className="bloger-profile__top-posts_card">{/* <BlogPostCard /> */}</div>
                    <div className="bloger-profile__top-posts_card">{/* <BlogPostCard /> */}</div>
                    <div className="bloger-profile__top-posts_card">{/* <BlogPostCard /> */}</div>
                </div>
            </div>
            <div className="bloger-profile__all-posts">
                <div className="bloger-profile__all-posts_title">Все посты:</div>
                <div className="bloger-profile__all-posts_list">
                    <div className="bloger-profile__all-posts_list_item">
                        <BlogPostCardLong />
                    </div>
                    <div className="bloger-profile__all-posts_list_item">
                        <BlogPostCardLong />
                    </div>
                    <div className="bloger-profile__all-posts_list_item">
                        <BlogPostCardLong />
                    </div>
                    <div className="bloger-profile__all-posts_list_item">
                        <BlogPostCardLong />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogerProfilePage;
