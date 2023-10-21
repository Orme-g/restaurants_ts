import RestaurantCard from "../restaurantCard/RestaurantCard"

import "./restaurantsGallery.sass"

const RestaurantsGallery = () => {
    return (
        <>
            <section className="restaurant-gallery">
                <div className="restaurant-gallery__title">
                    Последние добавленные рестораны
                </div>
                <div className="restaurant-gallery__cards">
                    <RestaurantCard />
                </div>
            </section>
        </>
    )
}

export default RestaurantsGallery
