const Event = require("../models/event");

const getEvent = (req, res) => {
    const eventId = req.params.id;
    Event.findById(eventId)
        .then((event) => res.status(200).json(event))
        .catch((error) => res.status(500).json({ error }));
};

const getRestaurantEvents = (req, res) => {
    const restaurantId = req.params.id;
    Event.find({ restaurantId })
        .sort({ addedDate: -1 })
        .then((result) => res.status(200).json(result))
        .catch((error) => res.status(500).json({ error }));
};

module.exports = {
    getEvent,
    getRestaurantEvents,
};
