const express = require('express')
const {
    getRestaurants,
    getRestaurantById,
    deleteRestaurant,
    postRestaurant,
    updateRestaurant,
} = require('../controllers/restaurant-controllers')

const router = express.Router()

router.get('/restaurants', getRestaurants)
router.get('/restaurants/:id', getRestaurantById)
router.delete('/restaurants/:id', deleteRestaurant)
router.post('/restaurants', postRestaurant)
router.patch('/restaurants/:id', updateRestaurant)

module.exports = router