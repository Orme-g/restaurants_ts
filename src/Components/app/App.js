import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import './App.sass';

import Navigation from '../navigation/Navigation';
import MainPage from '../pages/mainPage/MainPage';
import SingleRestaurantPage from '../pages/singleRestaurantPage/SingleRestaurantPage';
import Page404 from '../pages/Page404';
import Footer from '../footer/Footer';


function App() {
  return (
    <Router>
      <div className="App">
        <Navigation/>
          <Routes>
            <Route path='/' element={<MainPage/>} />
            <Route path='/restaurant/:restId' element={<SingleRestaurantPage/>} />
            <Route path='*' element={<Page404/>} />
          </Routes>
          <Footer/>
      </div>
    </Router>
  );
}


export default App;
