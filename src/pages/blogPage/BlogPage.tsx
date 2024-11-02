import React from "react";

import ChatIcon from "@mui/icons-material/Chat";
import FavoriteIcon from "@mui/icons-material/Favorite";

import "./blogPage.sass";

import avatar from "../../assets/avatar.jpg";
import pic from "../../assets/event.JPG";
import diet from "../../assets/collage/diet.JPG";
import food from "../../assets/collage/food.jpg";
import restaurant from "../../assets/collage/restaurant.JPG";
import recipe from "../../assets/collage/recipe.JPG";
import breakfast from "../../assets/collage/breakfast.JPG";
import beverage from "../../assets/collage/beverage.JPG";
import healthy from "../../assets/collage/healthy.JPG";

const BlogPage: React.FC = () => {
    return (
        <div className="blog-page__container">
            <section className="blog-page__section-1">
                <div className="blog-page__left-side">
                    <div className="blog-page__top-authors">
                        <div className="blog-page__top-authors_title">Топовые Блогеры:</div>
                        <div className="blog-page__top-authors_card">
                            <AuthorCard />
                        </div>
                        <div className="blog-page__top-authors_card">
                            <AuthorCard />
                        </div>
                        <div className="blog-page__top-authors_card">
                            <AuthorCard />
                        </div>
                        <div className="blog-page__top-authors_card">
                            <AuthorCard />
                        </div>
                    </div>
                    <div className="blog-page__popular-themes">
                        <div className="blog-page__popular-themes_title">Популярные темы:</div>
                        <div className="blog-page__popular-themes_item">
                            <div className="blog-page__popular-themes_item_name">Рестораны</div>
                            <div className="blog-page__popular-themes_item_posts-count">357</div>
                        </div>
                        <div className="blog-page__popular-themes_item">
                            <div className="blog-page__popular-themes_item_name">Еда</div>
                            <div className="blog-page__popular-themes_item_posts-count">220</div>
                        </div>
                        <div className="blog-page__popular-themes_item">
                            <div className="blog-page__popular-themes_item_name">Напитки</div>
                            <div className="blog-page__popular-themes_item_posts-count">138</div>
                        </div>
                        <div className="blog-page__popular-themes_item">
                            <div className="blog-page__popular-themes_item_name">Готовим дома</div>
                            <div className="blog-page__popular-themes_item_posts-count">81</div>
                        </div>
                        <div className="blog-page__popular-themes_item">
                            <div className="blog-page__popular-themes_item_name">Рецепты</div>
                            <div className="blog-page__popular-themes_item_posts-count">65</div>
                        </div>
                    </div>
                </div>
                <div className="blog-page__right-side">
                    <div className="blog-page__right-side_title">
                        Последние популярные статьи блога:
                    </div>
                    <div className="blog-page__right-side_list">
                        <BlogItemCard />
                        <BlogItemCard />
                        <BlogItemCard />
                        <BlogItemCard />
                    </div>
                </div>
            </section>
            <section className="blog-page__last-topics">
                <div className="blog-page__last-topics_title">Самые недавние статьи:</div>
                <div className="blog-page__last-topics_list">
                    <BlogItemCard />
                    <BlogItemCard />
                    <BlogItemCard />
                    <BlogItemCard />
                    <BlogItemCard />
                    <BlogItemCard />
                    <BlogItemCard />
                    <BlogItemCard />
                </div>
            </section>
            <section className="blog-page__themes">
                <div className="blog-page__themes_title">Следите за тем, что Вам интересно.</div>
                <div className="blog-page__themes_collage">
                    <div className="collage_common collage_diet">
                        <div className="collage_label collage_diet_label">Диета</div>
                        <img src={diet} alt="diet" />
                    </div>
                    <div className="collage_common collage_food">
                        <div className="collage_label collage_food_label">Еда</div>
                        <img src={food} alt="food" />
                    </div>
                    <div className="collage_common collage_recipe">
                        <div className="collage_label collage_recipe_label">Рецепты</div>
                        <img src={recipe} alt="recipe" />
                    </div>
                    <div className="collage_common collage_breakfast">
                        <div className="collage_label collage_breakfast_label">Завтраки</div>
                        <img src={breakfast} alt="breakfast" />
                    </div>
                    <div className="collage_common collage_restaurant">
                        <div className="collage_label collage_restaurant_label">Рестораны</div>
                        <img src={restaurant} alt="restaurant" />
                    </div>
                    <div className="collage_common collage_beverage">
                        <div className="collage_label collage_beverage_label">Напитки</div>
                        <img src={beverage} alt="beverage" />
                    </div>
                    <div className="collage_common collage_healthy">
                        <div className="collage_label collage_healthy_label">Здоровое питание</div>
                        <img src={healthy} alt="healthy" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BlogPage;

const AuthorCard: React.FC = () => {
    return (
        <div className="author-card__container">
            <div className="author-card__avatar">
                <img src={avatar} alt="avatar" />
            </div>
            <div className="author-card__name-occupation">
                <div className="author-card__name">Екатерина К.</div>
                <div className="author-card__occupation">Топ блогер</div>
            </div>
        </div>
    );
};

const BlogItemCard: React.FC = () => {
    return (
        <div className="blog-item-card__container">
            <div className="blog-item-card__author">
                <AuthorCard />
            </div>
            <div className="blog-item-card__image">
                <img src={pic} alt="title" />
            </div>
            <div className="blog-item-card__title">Почему бы не поесть?</div>
            <div className="blog-item-card__description">
                Вот мы задались вопросом, почему бы не поесть, если можно поесть??
            </div>
            <div className="blog-item-card__data">
                <div className="blog-item-card__data_likes">
                    <FavoriteIcon />
                    <span>43</span>
                </div>
                <div className="blog-item-card__data_comments">
                    <ChatIcon />
                    <span>126</span>
                </div>
                <div className="blog-item-card__data_themes">
                    <span>Еда, Напитки</span>{" "}
                </div>
            </div>
        </div>
    );
};
