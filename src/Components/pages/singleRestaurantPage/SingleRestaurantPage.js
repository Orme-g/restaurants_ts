
import { useState, useEffect } from 'react'


import { useHttp } from '../../../hooks/http.hook'

import './singleRestaurantPage.sass'
import Slider from '../../slider/Slider'
import RestSideInfo from '../../restSideInfo/RestSideInfo'
import RestaurantsTabs from '../../restaurantsTabs/RestaurantsTabs'



const SingleRestaurantPage = () => {

    const [data, setData] = useState([])

    const {request} = useHttp()

    useEffect(() => {
        request('http://localhost:3001/restaurants')
        .then(data => setData(data))
        
    }, [])

    const slidesData = data.length > 0 ? data[0].images : ["https://mriyaresort.com/upload/_content/c15/rcbjw5rhe9slfmrajaai5px9u6xlwa0o.jpg"]


    return (
        <>
        <div className='restaurant-info__container'>
            <Slider slides={slidesData}/>
            <RestSideInfo />
            
        </div>
            <RestaurantsTabs/>
        </>
        

    )
}


export default SingleRestaurantPage