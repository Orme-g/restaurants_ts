
const Comment = require('../models/comment')




const handleError = (res, error) => {
    res.status(500).json({error})
}


const getCommentsForTopic = (req, res) => {

    Comment
        .find({topic: req.params.topic})
        .sort({createdAt: -1})
        .then((comments) => {
            res
            .status(200)
            .json(comments)
        })
        .catch((err) => handleError(res, err))

}

const postComment = (req, res) => {
    const comment = new Comment(req.body)
    comment
        .save()
        .then((result) => {
            res
            .status(201)
            .json(result)

        })
        .catch((err) => handleError(res, err))

}

const deleteComment = (req, res) => {
    Comment
        .findByIdAndDelete(req.params.id)
        .then((result) => {
            res
            .status(200)
            .json(result)
        })
        .catch((err) => handleError(res, err))
}

module.exports = {
    getCommentsForTopic,
    postComment,
    deleteComment
}