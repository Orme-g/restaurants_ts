import React from "react";
import Slider from "../Components/sliderImages/Slider";
import { nanoid } from "@reduxjs/toolkit";

interface IContent {
    [key: string]: string | string[];
}

export const contentMaker = (content: IContent[]) => {
    const readyToDisplay = content.map((item) => {
        if ("text" in item) {
            const id = nanoid();
            return <p key={id}>{item.text}</p>;
        } else if ("bloquote" in item) {
            const id = nanoid();
            return <blockquote key={id}>{item.bloquote}</blockquote>;
        } else if ("photo" in item) {
            const id = nanoid();
            return (
                <div key={id} className="content__image">
                    <img src={item.photo as string} alt="post_image" />
                </div>
            );
        } else if ("slider" in item) {
            const id = nanoid();
            return (
                <div key={id} className="content__slider">
                    <Slider images={item.slider as string[]} />
                </div>
            );
        } else {
            return null;
        }
    });
    return readyToDisplay;
};
