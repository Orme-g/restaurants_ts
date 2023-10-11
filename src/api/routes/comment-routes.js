

const express = require('express')

const {
    getCommentsForTopic,
    postComment,
    deleteComment

} = require('../controllers/coment-controllers')


const router = express.Router()

router.get('/best-doner/comments/:topic', getCommentsForTopic)
router.post('/best-doner/comments', postComment)
router.delete('/best-doner/comments/:id', deleteComment)



module.exports = router