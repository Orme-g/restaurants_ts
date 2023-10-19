import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchLastAddedRestaurants } from '../../reducers/restaurants'
import Spinner from '../spinner/Spinner'

import './restaurantCard.sass'


const RestaurantCard = ({wrapper}) => {

    const dispatch = useDispatch()
    const {lastAddedRestaurants, pageLoading} = useSelector(state => state.restaurants)
    useEffect(() => {
        dispatch(fetchLastAddedRestaurants())
        // eslint-disable-next-line
    }, [])

    if (pageLoading === 'loading' || !lastAddedRestaurants) {
        return <Spinner/>
    }



    const makeRestaurantCard = (item) => {
        const {_id, name, short_description, title_image} = item
        return (
            <div className='restaurant-card' key={_id}>
                <div className='restaurant-card__image' style={{backgroundImage: `url(${title_image})`}}></div>
                <div className='restaurant-card__title'>{name}</div>
                <div className="restaurant-card__description">
                    {short_description}
                </div>
                <Link to={`/restaurant/${_id}`} className='restaurant-card__link'>Подробнее...</Link>
            </div>
        )
    }

    const elements = lastAddedRestaurants.map(item => {
       return makeRestaurantCard(item)
    })

    return (
        <>
            {elements}
        </>
    )
}



export default RestaurantCard