import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { fetchLastAddedRestaurants } from "../../reducers/restaurants"
import { CardsSkeleton } from "../skeletons/Skeletons"

// import pic from "../../assets/rest_photos/birch/bir_1.jpeg"

import "./restaurantCard.sass"

const RestaurantCard = () => {
    const dispatch = useDispatch()
    const { lastAddedRestaurants, pageLoading } = useSelector((state) => state.restaurants)
    useEffect(() => {
        dispatch(fetchLastAddedRestaurants())
        // eslint-disable-next-line
    }, [])

    if (pageLoading === "loading" || !lastAddedRestaurants) {
        return <CardsSkeleton />
    }

    const makeRestaurantCard = (item) => {
        const { _id, name, short_description, title_image } = item
        return (
            <div className="restaurant-card" key={_id}>
                <div
                    className="restaurant-card__image"
                    style={{ backgroundImage: `url(${title_image})` }}
                    // style={{ backgroundImage: `url(${pic})` }}
                ></div>
                <div className="restaurant-card__title">{name}</div>
                <div className="restaurant-card__description">{short_description}</div>
                <Link to={`/restaurant/${_id}`} className="restaurant-card__link">
                    Подробнее...
                </Link>
            </div>
        )
    }

    const elements = lastAddedRestaurants.map((item) => {
        return makeRestaurantCard(item)
    })

    return <>{elements}</>
}

export default RestaurantCard
