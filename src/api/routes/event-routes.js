const express = require("express");

const { getEvent, getRestaurantEvents } = require("../controllers/event-controllers");

const router = express.Router();

router.get("/event/:id", getEvent);
router.get("/event/restaurant/:id", getRestaurantEvents);

module.exports = router;
