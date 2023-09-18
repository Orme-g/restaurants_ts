import React from 'react';
import './App.sass';

import NavBar from '../navBar/NavBar';
import SideMenu from '../sideMenu/SideMenu'
import Header from '../header/Header';
import RestaurantsGallery from '../restaurantsGallery/RestaurantsGallery';
import SingleRestaurantPage from '../pages/singleRestaurantPage/SingleRestaurantPage';


function App() {
  return (
    <div className="App">
      {/* <NavBar/>
      <SideMenu/>
      <Header/> */}
      {/* <RestaurantsGallery/> */}
      <SingleRestaurantPage/>
    </div>
  );
}


export default App;
