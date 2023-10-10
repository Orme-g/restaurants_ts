const express = require('express')

const {
    getRestaurantReviews,

} = require('../controllers/review-controller')

const router = express.Router()

router.get('/reviews/:restaurant', getRestaurantReviews)



module.exports = router