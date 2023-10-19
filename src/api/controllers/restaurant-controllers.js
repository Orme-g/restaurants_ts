const Restaurant = require('../models/restaurant')

const handleError = (res, error) => {
    res.status(500).json({error})
}


const getRestaurants = (req, res) => {
    Restaurant
        .find()
        .sort({createdAt: -1})
        .limit(6)
        .then((restaurants) => {
            res
                .status(200)
                .json(restaurants)

        })
        .catch((err) => handleError(res, err))
}

const getRestaurantById = (req, res) => {
    Restaurant
        .findById(req.params.id)
        .then((restaurants) => {
            res
                .status(200)
                .json(restaurants)

            })
        .catch((err) => handleError(res, err))
}


const deleteRestaurant = (req, res) => {
    Restaurant
        .findByIdAndDelete(req.params.id)
        .then((result) => {
            res
                .status(200)
                .json(result)

            })
        .catch((err) => handleError(res, err))
}

const postRestaurant = (req, res) => {
    const restaurant = new Restaurant(req.body)  // Добавляем новый элемент которые берем из тела запроса
    restaurant
    .save()
    .then((result) => {
        res
            .status(201)
            .json(result)

        })
        .catch((err) => handleError(res, err))
}


const updateRestaurant = (req, res) => {
    Restaurant
        .findByIdAndUpdate(req.params.id, req.body)    // (id документа, новые данные)
        .then((result) => {
            res
                .status(200)
                .json(result)

            })
        .catch((err) => handleError(res, err))
}

const getSortedRestaurants = (req, res) => {
    let sortType
    switch (req.params.sort) {
        case 'expensive':
            sortType = {bill: -1}
            break
        case 'cheap':
            sortType = {bill: 1}
            break
        case 'best':
            sortType = {rating: -1}
            break
        default:
            sortType = null
    }
    Restaurant
        .find()
        .sort(sortType)
        .limit(10)
        .then((restaurants) => {
            res
                .status(200)
                .json(restaurants)

        })
        .catch((err) => handleError(res, err))
        
}

// Restaurant.findOne({name:'GOOD'}).then(rest => console.log(rest))

module.exports = {
    getRestaurants,
    getRestaurantById,
    deleteRestaurant,
    postRestaurant,
    updateRestaurant,
    getSortedRestaurants,

}