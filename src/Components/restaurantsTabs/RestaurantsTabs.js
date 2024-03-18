import { useState, memo } from "react"
import { useSelector } from "react-redux"

import { Box, Tab } from "@mui/material"
import { TabContext, TabList, TabPanel } from "@mui/lab"

import FeedbackItem from "../feedbackItem/FeedbackItem"
import ReviewForm from "../forms/reviewForm/ReviewForm"
import "./restaurantsTabs.sass"

const RestaurantsTabs = memo(({ description, restId }) => {
    const [activeTab, setActiveTab] = useState("1")
    const checkAuth = useSelector((state) => state.interactive.passAuth)

    const handleChange = (event, newActiveTab) => {
        setActiveTab(newActiveTab)
    }

    const unAuth = <div className="unAuthorised">Войдите, чтобы оставить отзыв</div>

    return (
        <div className="restaurants-tabs__container">
            <Box sx={{ width: "100%" }}>
                <TabContext value={activeTab}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList onChange={handleChange} aria-label="Restaurant Tabs">
                            <Tab label="О Ресторане" value="1" />
                            <Tab label="Меню" value="2" />
                            <Tab label="Отзывы" value="3" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <div className="restaurants-tabs__description">{description}</div>
                    </TabPanel>
                    <TabPanel value="2">
                        <div className="restaurants-tabs__menu">
                            <a href="https://ginza.ru/assets/files/20230913/27e44e1ecbae742adbd450c1b16df731.pdf">
                                Перейти для просмотра меню
                            </a>
                        </div>
                    </TabPanel>
                    <TabPanel value="3">
                        <div className="restaurants-tabs__feedback">
                            {checkAuth ? <ReviewForm restId={restId} /> : unAuth}
                            <FeedbackItem />
                        </div>
                    </TabPanel>
                </TabContext>
            </Box>
        </div>
    )
})

export default RestaurantsTabs
