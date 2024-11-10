const express = require("express");
const {
    getRestaurants,
    getRestaurantById,
    deleteRestaurant,
    addRestaurant,
    updateRestaurant,
    getSortedRestaurants,
    findRestaurant,
    getRestNamesAndIds,
} = require("../controllers/restaurant-controllers");

const router = express.Router();

router.get("/restaurants", getRestaurants);
router.get("/restaurants/:id", getRestaurantById);
router.delete("/restaurants/:id", deleteRestaurant);
router.post("/restaurants/add", addRestaurant);
router.patch("/restaurants/:id", updateRestaurant);
router.get("/sorted-restaurants/:sort", getSortedRestaurants);
router.post("/find-restaurant/selection", findRestaurant);
router.get("/find-restaurant/selection", findRestaurant);
router.get("/pairs", getRestNamesAndIds);

module.exports = router;
