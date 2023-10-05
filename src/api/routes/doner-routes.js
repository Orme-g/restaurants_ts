

const express = require('express')

const {
    getAllDoners,
    getDonerById,

} = require('../controllers/doner-controllers')

const router = express.Router()

router.get('/best-doner', getAllDoners)
router.get('/best-doner/:id', getDonerById)


module.exports = router