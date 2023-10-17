
import Header from "../../header/Header";
import RestaurantsGallery from "../../restaurantsGallery/RestaurantsGallery";

import './mainPage.sass'

const MainPage = () => {

    return (
        <>
            <Header/>
            <RestaurantsGallery/>
            <div className="flex">
            <div className="box"></div>
            <div className="box2"></div>
            </div>
            
        </>
           
    )
}



export default MainPage