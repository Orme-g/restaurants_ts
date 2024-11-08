import React from "react";

import BlogPostCard from "../../Components/blogPostCard/BlogPostCard";
import BlogPostCardLong from "../../Components/blogPostCardLong/BlogPostCardLong";

import "./blogerProfilePage.sass";

import bloger from "../../assets/blogers/bloger3.JPG";
import status from "../../assets/status1.PNG";

const BlogerProfilePage: React.FC = () => {
    return (
        <div className="bloger-profile__container">
            <div className="bloger-profile__info">
                <div className="bloger-profile__info_image">
                    <img src={bloger} alt="bloger" />
                </div>
                <div className="bloger-profile__info_container">
                    <div className="bloger-profile__info_name">
                        Екатерина Постенко, <span>Санкт-Петербург</span>
                    </div>
                    <div className="bloger-profile__info_status">
                        <div className="status-title">Топ блогер </div>
                        <div className="status-image">
                            <img src={status} alt="status" />
                        </div>
                    </div>
                    <div className="bloger-profile__info_posts-count">Cтатей: 35</div>
                    <div className="bloger-profile__info_about-me">
                        Немного о себе. Веду блог о здоровом питании. Сначала говорю, что куриные
                        яйца есть вредно, потом через какое-то время заявляю обратное. Та же
                        петрушка и с мёдом, что его нельзя греть...
                    </div>
                </div>
            </div>
            <div className="bloger-profile__top-posts">
                <div className="bloger-profile__top-posts_title">Самые популярные посты:</div>
                <div className="bloger-profile__top-posts_list">
                    <div className="bloger-profile__top-posts_card">
                        <BlogPostCard />
                    </div>
                    <div className="bloger-profile__top-posts_card">
                        <BlogPostCard />
                    </div>
                    <div className="bloger-profile__top-posts_card">
                        <BlogPostCard />
                    </div>
                    <div className="bloger-profile__top-posts_card">
                        <BlogPostCard />
                    </div>
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
