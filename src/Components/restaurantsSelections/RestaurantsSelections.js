import SliderCards from "../sliderCards/SliderCards"
import "./restaurantsSelections.sass"

const RestaurantsSelections = () => {
    return (
        <section className="restaurants-selections">
            <div className="restaurants-selections__title">
                Наши подборки для вас
            </div>
            <article className="selection expensive">
                <div className="selection__title">Самые дорогие рестораны</div>
                <SliderCards type="expensive" />
            </article>
            <article className="selection cheap">
                <div className="selection__title">Самые доступные</div>
                <SliderCards type="cheap" />
            </article>
            <article className="selection best">
                <div className="selection__title">Самый высокий рейтинг</div>
                <SliderCards type="best" />
            </article>
        </section>
    )
}

export default RestaurantsSelections
