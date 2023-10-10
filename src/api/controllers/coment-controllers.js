
const Comment = require('../models/comment')




const handleError = (res, error) => {
    res.status(500).json({error})
}


const getCommentsForTopic = (req, res) => {

    Comment
        .find({topic: req.params.topic})
        .then((comments) => {
            res
            .status(200)
            .json(comments)
        })
        .catch((err) => handleError(res, err))

}

module.exports = {
    getCommentsForTopic
}