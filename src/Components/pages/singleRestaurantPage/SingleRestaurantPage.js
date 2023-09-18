

import './singleRestaurantPage.sass'
import Slider from '../../slider/Slider'
import RestSideInfo from '../../restSideInfo/RestSideInfo'
import RestaurantsTabs from '../../restaurantsTabs/RestaurantsTabs'


const SingleRestaurantPage = () => {


    return (
        <>
        <div className='restaurant-info__container'>
            <Slider/>
            <RestSideInfo/>
            
        </div>
        <RestaurantsTabs/>
        </>
        

    )
}


export default SingleRestaurantPage