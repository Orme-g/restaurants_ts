
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRestaurantData } from '../../../reducers/restaurantPage'
import { useParams } from 'react-router-dom'

import './singleRestaurantPage.sass'
import Slider from '../../slider/Slider'
import RestSideInfo from '../../restSideInfo/RestSideInfo'
import RestaurantsTabs from '../../restaurantsTabs/RestaurantsTabs'
import Spinner from '../../spinner/Spinner'



const SingleRestaurantPage = () => {

    const {restaurantData, pageLoading} = useSelector(state => state.restaurantPage)
    const dispatch = useDispatch()
    const {restId} = useParams()
    console.log(restId)

    useEffect(() => {
        dispatch(fetchRestaurantData())
        // eslint-disable-next-line
    }, [])

    if (pageLoading === 'loading') {
        return <Spinner/>
    }

    const slidesData = restaurantData[restId-1].images
    const tabsData = [restaurantData[restId-1].description, restaurantData[restId-1].reviews] 


    return (
        <>
        <div className='restaurant-info__container'>
            <Slider slides={slidesData}/>
            <RestSideInfo data={restaurantData[restId-1]}/>
            
        </div>
            <RestaurantsTabs data={tabsData}/>
        </>
        

    )
}


export default SingleRestaurantPage