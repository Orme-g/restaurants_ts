

import Header from "../../header/Header";
import ModalLogin from "../../modalLogin/ModalLogin";
import RestaurantsGallery from "../../restaurantsGallery/RestaurantsGallery";

import './mainPage.sass'

const MainPage = () => {

    return (
        <>
           <Header/>

            <RestaurantsGallery/>
            <ModalLogin/>
        </>
           
    )
}



export default MainPage