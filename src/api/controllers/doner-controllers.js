
const Doner = require('../models/doner')

const handleError = (res, error) => {
    res.status(500).json({error})
}


const getAllDoners = (req, res) => {
    Doner
    .find()
    .then((restaurants) => {
        res
            .status(200)
            .json(restaurants)

    })
    .catch((err) => handleError(res, err))

}


const getDonerById = (req, res) => {
    Doner
        .findById(req.params.id)
        .then((restaurants) => {
            res
                .status(200)
                .json(restaurants)

            })
        .catch((err) => handleError(res, err))
}


module.exports = {
    getAllDoners,
    getDonerById
}