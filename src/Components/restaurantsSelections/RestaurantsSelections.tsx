import React from "react";
import SliderCards from "../sliderCards/SliderCards";

import "./restaurantsSelections.scss";

const RestaurantsSelections = () => {
    return (
        <section className="restaurants-selections">
            <div className="restaurants-selections__title">Наши подборки для вас</div>
            <article className="selection expensive">
                <div className="selection__title">Самые дорогие рестораны</div>
                <SliderCards sortType="expensive" cardsNumber={10} />
            </article>
            <article className="selection cheap">
                <div className="selection__title">Самые доступные</div>
                <SliderCards sortType="cheap" cardsNumber={10} />
            </article>
            <article className="selection best">
                <div className="selection__title">Самый высокий рейтинг</div>
                <SliderCards sortType="best" cardsNumber={10} />
            </article>
        </section>
    );
};

export default RestaurantsSelections;
