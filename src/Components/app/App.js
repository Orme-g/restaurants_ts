
import {lazy, Suspense} from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Spinner from '../spinner/Spinner';

import './App.sass';

import Navigation from '../navigation/Navigation';
import Footer from '../footer/Footer';
import ModalLogin from '../modalLogin/ModalLogin';


const MainPage = lazy(() => import('../pages/mainPage/MainPage'))
const SingleRestaurantPage = lazy(() => import('../pages/singleRestaurantPage/SingleRestaurantPage'))
const BestDoner = lazy(() => import('../pages/bestDoner/BestDoner'))
const BestDonerPage = lazy(() => import('../pages/bestDonerPage/BestDonerPage'))
const Page404 = lazy(() => import('../pages/Page404'))




function App() {
  return (
    <Router>
      <div className="App">
        <Navigation/>
          <Suspense fallback={<Spinner/>}>
            <Routes>
              <Route path='/' element={<MainPage/>} />
              <Route path='/restaurant/:restId' element={<SingleRestaurantPage/>} />
              <Route path='/best-doner' element={<BestDoner/>} />
              <Route path='/best-doner/:donerId' element={<BestDonerPage/>} />
              <Route path='*' element={<Page404/>} />
            </Routes>
          </Suspense>
          <Footer/>
        <ModalLogin/>
      </div>
    </Router>
  );
}


export default App;
