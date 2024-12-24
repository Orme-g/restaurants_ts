import React from "react";
import Slider from "../Components/sliderImages/Slider";

interface IContent {
    [key: string]: string | string[];
}

export const contentMaker = (content: IContent[]) => {
    const readyToDisplay = content.map((item) => {
        if ("text" in item) {
            return <p>{item.text}</p>;
        } else if ("bloquote" in item) {
            return <blockquote>{item.bloquote}</blockquote>;
        } else if ("photo" in item) {
            return (
                <div className="content__image">
                    <img src={item.photo as string} alt="post_image" />
                </div>
            );
        } else if ("slider" in item) {
            return (
                <div className="content__slider">
                    <Slider images={item.slider as string[]} />
                </div>
            );
        } else {
            return null;
        }
    });
    return readyToDisplay;
};
