

const express = require('express')

const {
    getCommentsForTopic

} = require('../controllers/coment-controllers')


const router = express.Router()

router.get('/best-doner/comments/:topic', getCommentsForTopic)

module.exports = router