import React from "react";
import { lazy, Suspense } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navigation from "../navigation/Navigation";
import Footer from "../footer/Footer";
import ModalLogin from "../modals/modalLogin/ModalLogin";
import ModalRegister from "../modals/modalRegister/ModalRegister";
import Snack from "../snackbar/Snackbar";
import Spinner from "../svg/Spinner";

import useLocalStorage from "../../hooks/useLocalStorage";
import { setUserData, setPassAuth } from "../../reducers/interactive";
import { ScrollToTop } from "../../services/ScrollToTop";

import "./App.sass";

const MainPage = lazy(() => import("../pages/mainPage/MainPage"));
const SingleRestaurantPage = lazy(
    () => import("../pages/singleRestaurantPage/SingleRestaurantPage")
);
const FindRestaurant = lazy(() => import("../pages/findRestaurant/FindRestaurant"));
const BestDoner = lazy(() => import("../pages/bestDoner/BestDoner"));
const BestDonerPage = lazy(() => import("../pages/bestDonerPage/BestDonerPage"));
const InfoPage = lazy(() => import("../pages/infoPage/InfoPage"));
const ProfilePage = lazy(() => import("../pages/profilePage/ProfilePage"));
const AdminPage = lazy(() => import("../pages/adminPage/AdminPage"));
const Page404 = lazy(() => import("../pages/Page404"));

export const App: React.FC = () => {
    const dispatch = useDispatch();
    const { getUserData } = useLocalStorage();
    if (getUserData()) {
        const userData = getUserData();
        dispatch(setUserData(userData));
        dispatch(setPassAuth(true));
    }

    return (
        <Router>
            <ScrollToTop />
            <div className="App">
                <Navigation />
                <Suspense fallback={<Spinner />}>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/restaurant/:restId" element={<SingleRestaurantPage />} />
                        <Route path="/find-restaurant" element={<FindRestaurant />} />
                        <Route path="/best-doner" element={<BestDoner />} />
                        <Route path="/best-doner/:donerId" element={<BestDonerPage />} />
                        <Route path="/info/:infoType" element={<InfoPage />} />
                        <Route path="/profile/:userId" element={<ProfilePage />} />
                        <Route path="/admin" element={<AdminPage />} />
                        <Route path="*" element={<Page404 />} />
                    </Routes>
                </Suspense>
                <Footer />
                <ModalLogin />
                <ModalRegister />
                <Snack />
            </div>
        </Router>
    );
};
