import React from 'react';
import './App.sass';

import NavBar from '../navBar/NavBar';
import SideMenu from '../sideMenu/SideMenu'
import Header from '../header/Header';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <SideMenu/>
      <Header/>
    </div>
  );
}


export default App;
