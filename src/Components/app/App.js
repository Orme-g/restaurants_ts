import { lazy, Suspense } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Spinner from "../spinner/Spinner"

import "./App.sass"

import Navigation from "../navigation/Navigation"
import Footer from "../footer/Footer"
import ModalLogin from "../modals/modalLogin/ModalLogin"
import ModalRegister from "../modals/modalRegister/ModalRegister"
import Snack from "../snackbar/Snackbar"

import { useDispatch } from "react-redux"
import useLocalStorage from "../../hooks/useLocalStorage"
import { setUserData, setPassAuth } from "../../reducers/interactive"

const MainPage = lazy(() => import("../pages/mainPage/MainPage"))
const SingleRestaurantPage = lazy(() =>
    import("../pages/singleRestaurantPage/SingleRestaurantPage")
)
const BestDoner = lazy(() => import("../pages/bestDoner/BestDoner"))
const BestDonerPage = lazy(() => import("../pages/bestDonerPage/BestDonerPage"))
const Page404 = lazy(() => import("../pages/Page404"))

function App() {
    const dispatch = useDispatch()
    const { getUserData } = useLocalStorage()
    if (getUserData()) {
        const userData = getUserData()
        dispatch(setUserData(userData))
        dispatch(setPassAuth(true))
    }

    return (
        <Router>
            <div className="App">
                <Navigation />
                <Suspense fallback={<Spinner />}>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route
                            path="/restaurant/:restId"
                            element={<SingleRestaurantPage />}
                        />
                        <Route path="/best-doner" element={<BestDoner />} />
                        <Route
                            path="/best-doner/:donerId"
                            element={<BestDonerPage />}
                        />
                        <Route path="*" element={<Page404 />} />
                    </Routes>
                </Suspense>
                <Footer />
                <ModalLogin />
                <ModalRegister />
                <Snack />
            </div>
        </Router>
    )
}

export default App
