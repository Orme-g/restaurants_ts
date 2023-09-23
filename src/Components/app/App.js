import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import './App.sass';

import Navigation from '../navigation/Navigation';
import MainPage from '../pages/MainPage';
import SingleRestaurantPage from '../pages/singleRestaurantPage/SingleRestaurantPage';
import Page404 from '../pages/Page404';


function App() {
  return (
    <Router>
      <div className="App">
        <Navigation/>
          <Routes>
            <Route path='/' element={<MainPage/>} />
            <Route path='/restaurant' element={<SingleRestaurantPage/>} />
            <Route path='*' element={<Page404/>} />
          </Routes>
          {/* <Header/>
          <RestaurantsGallery/> */}
          {/* <SingleRestaurantPage/> */}
      </div>
    </Router>
  );
}


export default App;
