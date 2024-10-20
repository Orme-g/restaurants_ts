const express = require("express");

const {
    registration,
    login,
    getUsers,
    getUserData,
    changePassword,
    getReviewedRestaurantsList,
    addReviewedRestaurant,
    changeAvatar,
    handleFavouriteRestaurant,
    // getFavouriteRestNames,
} = require("../controllers/user-controllers");

const router = express.Router();

router.post("/register", registration);
router.post("/login", login);
router.get("/users", getUsers);
router.get("/user/getdata/:userId", getUserData);
router.patch("/profile", changePassword);
router.get("/reviewedRestaurants/:userId", getReviewedRestaurantsList);
router.patch("/addReviewedRestaurant", addReviewedRestaurant);
router.patch("/changeAvatar", changeAvatar);
router.patch("/handleFavouriteRestaurant", handleFavouriteRestaurant);
// router.get("/get-favourite-restaurants-names/:userId", getFavouriteRestNames);

module.exports = router;
