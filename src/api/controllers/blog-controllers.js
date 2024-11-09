const BlogPost = require("../models/blogPost");

const getPostData = (req, res) => {
    try {
        const { postId } = req.params;
        // console.log(postId);
        BlogPost.findById(postId)
            .then((result) => res.status(200).json(result))
            // .then((result) => console.log(result))
            .catch((e) => res.status(500).json(e));
    } catch (e) {
        res.status(500).json(e);
    }
};

const getAllPosts = (req, res) => {
    // BlogPost.find().then((result) => res.status(200).json(result));
    // return res.status(200).json("All ok");
};

module.exports = {
    getPostData,
    getAllPosts,
};
