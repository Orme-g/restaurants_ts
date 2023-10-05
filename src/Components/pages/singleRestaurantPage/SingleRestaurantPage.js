
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRestaurantData } from '../../../reducers/restaurants'
import { useParams } from 'react-router-dom'


import './singleRestaurantPage.sass'
import Slider from '../../slider/Slider'
import RestSideInfo from '../../restSideInfo/RestSideInfo'
import RestaurantsTabs from '../../restaurantsTabs/RestaurantsTabs'
import Spinner from '../../spinner/Spinner'


const SingleRestaurantPage = () => {

    const {restaurantData, pageLoading} = useSelector(state => state.restaurants)
    const dispatch = useDispatch()
    const {restId} = useParams()
    console.log('render')

    useEffect(() => {
        dispatch(fetchRestaurantData(restId))
        // eslint-disable-next-line
    }, [])

    
    if (pageLoading === 'loading') {
        return <Spinner/>
    }

    const slidesData = restaurantData.images
    const tabsData = [restaurantData.description, restaurantData.reviews] 


    return (
        <>
        <div className='restaurant-info__container'>
            <Slider slides={slidesData}/>
            <RestSideInfo data={restaurantData}/>
            
        </div>
            <RestaurantsTabs data={tabsData}/>
        </>
        

    )
}


export default SingleRestaurantPage