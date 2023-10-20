const express = require('express')

const {
    getRestaurantReviews,
    postRestaurantReview

} = require('../controllers/review-controller')

const router = express.Router()

router.get('/reviews/:restaurant', getRestaurantReviews)
router.post('/reviews', postRestaurantReview)



module.exports = router