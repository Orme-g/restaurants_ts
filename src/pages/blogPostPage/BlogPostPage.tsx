import React from "react";

import ChatIcon from "@mui/icons-material/Chat";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Button } from "@mui/material";
import "./blogPostPage.sass";

import BlogAuthorBadge from "../../Components/blogAuthorBadge/BlogAuthorBadge";
import CommentsBlock from "../../Components/commentsBlock/CommentsBlock";

import avatar from "../../assets/blogers/bloger4.jpg";
import pic from "../../assets/collage/IMG_6572.JPG";

const BlogPostPage: React.FC = () => {
    const eventId = "999";
    return (
        <>
            <div className="blog-post-page__container">
                {/* <div className="blog-post-page__title">Очередной пост. Уже не знаю о чём писать.</div> */}
                <div className="blog-post-page__author">
                    <BlogAuthorBadge avatar={avatar} />
                </div>
                <div className="blog-post-page__title">
                    Очередной пост. Уже не знаю о чём писать.
                </div>
                <div className="blog-post-page__subtitle">
                    Но так как мне платят за количество буквок, продолжаю писать! И писать не абы
                    что, а что-то эдакое.
                </div>
                <div className="blog-post-page__image">
                    <img src={pic} alt="main" />
                </div>
                <div className="blog-post-page__blockquote">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi voluptatibus
                    repudiandae molestiae neque assumenda? Quasi sint et quos, inventore ipsa nihil
                    unde eligendi. Mollitia reiciendis quisquam unde explicabo architecto dolore?
                </div>
                <div className="blog-post-page__text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat optio vitae
                    asperiores ut, possimus pariatur aspernatur obcaecati odit voluptatum nemo
                    veniam earum aliquid. Rem voluptatum iste in eius dolorem. Eaque maxime
                    reprehenderit totam quos vel esse optio aliquam culpa, ab natus dolor,
                    dignissimos voluptatum in a vitae facere eos! Vero laboriosam, perspiciatis iure
                    quia provident exercitationem sequi asperiores, inventore natus, facilis itaque.
                    Sed cupiditate non rerum asperiores labore dolore, illum, nobis dolorum cum
                    soluta accusantium consectetur. Eligendi vel facere pariatur voluptate molestias
                    harum aperiam minima et, beatae numquam aut illum illo dolorum soluta recusandae
                    repudiandae sint labore? Fuga et omnis velit dolorum vitae officia harum
                    adipisci eius corporis tempore, illo inventore laborum neque molestiae beatae.
                    Exercitationem at nulla dicta omnis ipsum veritatis obcaecati reiciendis!
                    Tempore praesentium reiciendis repellat sequi saepe, dolores hic necessitatibus
                    eaque facilis magni in itaque optio tenetur accusamus iste aperiam minus et,
                    provident neque atque esse odit odio. Incidunt ipsa saepe, dolore perferendis
                    recusandae aspernatur porro possimus ipsam perspiciatis dignissimos magnam
                    aliquid laboriosam ab repellendus explicabo odio ipsum molestiae autem
                    blanditiis nostrum rem eaque quas. Dignissimos a quos, aut possimus quaerat
                    tempora modi excepturi facilis. Dolore delectus saepe ipsa natus cumque alias,
                    nam consequuntur soluta eum inventore.
                </div>
                <div className="blog-post-page__date">12 Октября 2024</div>
                <div className="blog-post-page__feedback">
                    <div className="blog-post-page__feedback_likes">
                        <FavoriteIcon />
                        <span>43</span>
                    </div>
                    <div className="blog-post-page__feedback_comments">
                        <ChatIcon />
                        <span>126</span>
                    </div>
                    <div className="blog-post-page__feedback_themes">
                        <span>Еда, Напитки</span>{" "}
                    </div>
                </div>
                <Button className="blog-post-page__like-button" variant="contained">
                    Понравилась!
                </Button>

                <div className="blog-post-page__comments">
                    <CommentsBlock currentTopicId={eventId} />
                </div>
            </div>
        </>
    );
};

export default BlogPostPage;
