
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRestaurantData, fetchRestaurantReviews } from '../../../reducers/restaurants'
import { useParams } from 'react-router-dom'


import './singleRestaurantPage.sass'
import Slider from '../../sliderImages/Slider'
import RestSideInfo from '../../restSideInfo/RestSideInfo'
import RestaurantsTabs from '../../restaurantsTabs/RestaurantsTabs'
import Spinner from '../../spinner/Spinner'


const SingleRestaurantPage = () => {

    const {restaurantData, pageLoading} = useSelector(state => state.restaurants)
    const dispatch = useDispatch()
    const {restId} = useParams()

    useEffect(() => {
        dispatch(fetchRestaurantData(restId))
        dispatch(fetchRestaurantReviews(restId))
        // eslint-disable-next-line
    }, [])

    
    if (pageLoading === 'loading' || restaurantData === null) {
        return <Spinner/>
    }

    const {images, description} = restaurantData

    return (
        <>
        <div className='restaurant-info__container'>
            <div className="restaurant-info__slider">
                <Slider images={images}/>
            </div>
            <RestSideInfo data={restaurantData}/>
            
        </div>
            <RestaurantsTabs description={description}/>
        </>
        

    )
}


export default SingleRestaurantPage