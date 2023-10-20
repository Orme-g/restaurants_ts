
const Review = require('../models/review')

const handleError = (res, error) => {
    res.status(500).json({error})
}

const getRestaurantReviews = (req, res) => {

Review
    .find({restaurant: req.params.restaurant})
    .sort({createdAt: -1})
    .then((reviews) => {
        res
        .status(200)
        .json(reviews)
    })
    .catch((err) => handleError(res, err))
}

const postRestaurantReview = (req, res) => {

    const review = new Review(req.body)
    review
        .save()
        .then(() => {
            res.status(200).json({message: 'Ваш отзыв отправлен!'})
        })
        .catch((err) => handleError(res, err))

}


module.exports = {
    getRestaurantReviews,
    postRestaurantReview

}