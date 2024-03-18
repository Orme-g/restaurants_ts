const express = require("express")

const {
    getCommentsForTopic,
    postComment,
    deleteComment,
    likeComment,
    dislikeComment,
} = require("../controllers/coment-controllers")

const router = express.Router()

router.get("/best-doner/comments/:topic", getCommentsForTopic)
router.post("/best-doner/comments", postComment)
router.delete("/best-doner/comments/:id", deleteComment)
router.patch("/best-doner/comments/like/:id", likeComment)
router.patch("/best-doner/comments/dislike/:id", dislikeComment)

module.exports = router
