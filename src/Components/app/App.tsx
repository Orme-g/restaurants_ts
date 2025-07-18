import React, { useEffect, memo } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { lazy, Suspense } from "react";
import { useAppDispatch } from "../../types/store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navigation from "../navigation/Navigation";
import Footer from "../footer/Footer";
import Snack from "../snackbar/Snackbar";
import Spinner from "../svg/Spinner";
import { ScrollToTop } from "../../services/ScrollToTop";
import { useLazyMeQuery } from "../../services/authApi";

import "./App.scss";

const MainPage = lazy(() => import("../../pages/mainPage/MainPage"));
const SingleRestaurantPage = lazy(
    () => import("../../pages/singleRestaurantPage/SingleRestaurantPage")
);
import RestaurantSelectionPage from "../../pages/restaurantSelectionPage/RestaurantSelectionPage";
import { setIsAuth, setUserDataAndAuth } from "../../reducers/interactive";
const BestDonersListPage = lazy(() => import("../../pages/bestDonersListPage/BestDonersListPage"));
const BlogPage = lazy(() => import("../../pages/blogPage/BlogPage"));
const BlogPostPage = lazy(() => import("../../pages/blogPostPage/BlogPostPage"));
const SingleDonerPage = lazy(() => import("../../pages/singleDonerPage/SingleDonerPage"));
const EventPage = lazy(() => import("../../pages/singleEventPage/SingleEventPage"));
const InfoPage = lazy(() => import("../../pages/infoPage/InfoPage"));
const ProfilePage = lazy(() => import("../../pages/profilePage/ProfilePage"));
const BlogerProfilePage = lazy(() => import("../../pages/blogerProfilePage/BlogerProfilePage"));
const BlogPageThemeSelection = lazy(
    () => import("../../pages/blogPageThemeSelection/BlogPageThemeSelection")
);
const AdminPage = lazy(() => import("../../pages/adminPage/AdminPage"));
const Page404 = lazy(() => import("../../pages/Page404"));
const LoginPage = lazy(() => import("../../pages/loginPage/LoginPage"));
const RegisterPage = lazy(() => import("../../pages/registerPage/RegisterPage"));

const Workshop = lazy(() => import("../../pages/workshop/Workshop"));

export const App: React.FC = () => {
    const [getUserData] = useLazyMeQuery();
    const dispatch = useAppDispatch();
    useEffect(() => {
        getUserData()
            .unwrap()
            .then((userData) => {
                dispatch(setUserDataAndAuth(userData));
            })
            .catch(() => dispatch(setIsAuth(false)));
    }, []);
    return (
        <HelmetProvider>
            <Helmet>
                <title>WEATS. Подбор ресторана, события, блог.</title>
            </Helmet>
            <Router>
                <ScrollToTop />
                <div className="App">
                    <Navigation />
                    <Suspense fallback={<Spinner />}>
                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/restaurant/:restId" element={<SingleRestaurantPage />} />
                            <Route path="/find-restaurant" element={<RestaurantSelectionPage />} />
                            <Route path="/best-doner" element={<BestDonersListPage />} />
                            <Route path="/best-doner/:donerId" element={<SingleDonerPage />} />
                            <Route path="/blog" element={<BlogPage />} />
                            <Route path="/blog/blog-post/:postId" element={<BlogPostPage />} />
                            <Route
                                path="/blog/bloger-profile/:userId"
                                element={<BlogerProfilePage />}
                            />
                            <Route
                                path="/blog/blog-theme/:theme"
                                element={<BlogPageThemeSelection />}
                            />
                            <Route path="/event/:eventId" element={<EventPage />} />
                            <Route path="/info/:infoType" element={<InfoPage />} />
                            <Route path="/profile/:userId" element={<ProfilePage />} />
                            <Route path="/admin" element={<AdminPage />} />
                            <Route path="/workshop" element={<Workshop />} />
                            <Route path="*" element={<Page404 />} />
                        </Routes>
                    </Suspense>
                    <Footer />
                    <Snack />
                </div>
            </Router>
        </HelmetProvider>
    );
};
