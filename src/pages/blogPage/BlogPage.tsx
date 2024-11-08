import React from "react";

import BlogAuthorBadge from "../../Components/blogAuthorBadge/BlogAuthorBadge";
import BlogPostCard from "../../Components/blogPostCard/BlogPostCard";

import "./blogPage.sass";

import diet from "../../assets/collage/diet.JPG";
import food from "../../assets/collage/food.jpg";
import restaurant from "../../assets/collage/restaurant.JPG";
import recipe from "../../assets/collage/recipe.JPG";
import breakfast from "../../assets/collage/breakfast.JPG";
import beverage from "../../assets/collage/beverage.JPG";
import healthy from "../../assets/collage/healthy.JPG";

import bloger1 from "../../assets/blogers/bloger1.jpg";
import bloger2 from "../../assets/blogers/bloger2.jpg";
import bloger3 from "../../assets/blogers/bloger3.JPG";
import bloger4 from "../../assets/blogers/bloger4.jpg";

const BlogPage: React.FC = () => {
    return (
        <div className="blog-page__container">
            <section className="blog-page__section-1">
                <div className="blog-page__left-side">
                    <div className="blog-page__top-authors">
                        <div className="blog-page__top-authors_title">Топовые Блогеры:</div>
                        <div className="blog-page__top-authors_card">
                            <BlogAuthorBadge avatar={bloger1} />
                        </div>
                        <div className="blog-page__top-authors_card">
                            <BlogAuthorBadge avatar={bloger2} />
                        </div>
                        <div className="blog-page__top-authors_card">
                            <BlogAuthorBadge avatar={bloger3} />
                        </div>
                        <div className="blog-page__top-authors_card">
                            <BlogAuthorBadge avatar={bloger4} />
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
                        <BlogPostCard />
                        <BlogPostCard />
                        <BlogPostCard />
                        <BlogPostCard />
                    </div>
                </div>
            </section>
            <section className="blog-page__last-topics">
                <div className="blog-page__last-topics_title">Самые недавние статьи:</div>
                <div className="blog-page__last-topics_list">
                    <BlogPostCard />
                    <BlogPostCard />
                    <BlogPostCard />
                    <BlogPostCard />
                    <BlogPostCard />
                    <BlogPostCard />
                    <BlogPostCard />
                    <BlogPostCard />
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
