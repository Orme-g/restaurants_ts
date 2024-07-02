const express = require("express");

const {
    registration,
    login,
    getUsers,
    changePassword,
    getReviewedRestaurantsList,
} = require("../controllers/auth-controllers");

const router = express.Router();

router.post("/register", registration);
router.post("/login", login);
router.get("/users", getUsers);
router.patch("/profile", changePassword);
router.get("/reviewedRestaurants", getReviewedRestaurantsList);

module.exports = router;
