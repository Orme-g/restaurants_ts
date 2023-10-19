const express = require('express')
const {
    getRestaurants,
    getRestaurantById,
    deleteRestaurant,
    postRestaurant,
    updateRestaurant,
    getSortedRestaurants


} = require('../controllers/restaurant-controllers')

const router = express.Router()

router.get('/restaurants', getRestaurants)
router.get('/restaurants/:id', getRestaurantById)
router.delete('/restaurants/:id', deleteRestaurant)
router.post('/restaurants', postRestaurant)
router.patch('/restaurants/:id', updateRestaurant)
router.get('/sorted-restaurants/:sort', getSortedRestaurants)


module.exports = router